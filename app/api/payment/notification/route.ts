import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { changeProductStatus } from "@/utils/supabase/queries/products";
import { prepareInvoiceEmail } from "@/lib/utils";
import { InvoiceEmailTemplateData } from "@/lib/email-templates";
import { sendEmailWithFallback } from "@/app/actions";


export async function POST(req: Request) {
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            await (await req.blob()).text(),
            req.headers.get("stripe-signature") as string,
            process.env.STRIPE_WEBHOOK_SECRET as string,
        );
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        // On error, log and return the error message.
        console.log("error meesssage", errorMessage)
        if (!(err instanceof Error)) console.log(err);
        console.log(`❌ Error message: ${errorMessage}`);
        return NextResponse.json(
            { message: `Webhook Error: ${errorMessage}` },
            { status: 400 },
        );
    }

    console.log("✅ Success:", event.id);

    const permittedEvents: string[] = [
        "checkout.session.completed",
        "payment_intent.succeeded",
        "payment_intent.payment_failed",
    ];

    if (permittedEvents.includes(event.type)) {
        let data;

        try {
            switch (event.type) {
                case "checkout.session.completed":
                    data = event.data.object as Stripe.Checkout.Session;
                    console.log("completed", data)
                    changeProductStatus(parseInt(data.metadata?.product_id || "0"), "accepted")
                    console.log(`💰 CheckoutSession status: ${data.payment_status}`);
                    if (data.metadata && data.metadata.user_email != "") {
                        console.log("sending email")
                        const emailData: InvoiceEmailTemplateData = {
                            transactionId: data.id,
                            invoiceNumber: data.metadata?.product_id || "0",
                            customerEmail: data.metadata ? data.metadata.user_email : "",
                            adDuration: "Piiramatu",
                            productName: data.metadata ? data.metadata.product_name : "Toode",
                            invoiceDate: new Date().toLocaleDateString("et-EE"),
                            amount: data.amount_total ? (data.amount_total / 100).toFixed(2) + " EUR" : "0 EUR",
                            paymentMethod: data.payment_method_types ? data.payment_method_types[0] : "N/A",
                        }
                        const emailContent = prepareInvoiceEmail(emailData)
                        const emailSent = await sendEmailWithFallback(data.metadata?.user_email, emailContent)
                        if (emailSent) {
                            console.log("Invoice email sent to:", data.metadata?.user_email);
                        }
                    } else {
                        console.log("No customer email found in the session.")
                    }
                    break;
                case "payment_intent.payment_failed":
                    data = event.data.object as Stripe.PaymentIntent;
                    console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
                    break;
                case "payment_intent.succeeded":
                    data = event.data.object as Stripe.PaymentIntent;
                    console.log(`💰 PaymentIntent status: ${data.status}`);
                    break;
                default:
                    throw new Error(`Unhandled event: ${event.type}`);
            }
        } catch (error) {
            console.log(error);
            return NextResponse.json(
                { message: "Webhook handler failed" },
                { status: 500 },
            );
        }
    }
    return NextResponse.json(
        { message: `Success` },
        { status: 200 },
    );
}