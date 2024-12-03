import { validateMAC } from "@/lib/utils";
import { NextResponse } from "next/server";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get('content-type');

        let body;
        let mac;
        if (contentType === 'application/x-www-form-urlencoded') {
            const text = await req.text();
            const params = new URLSearchParams(text);
            const jsonString = params.get('json');
            mac = params.get('mac')

            if (!jsonString) {
                throw new Error('Missing "json" parameter in the body');
            }


            body = JSON.parse(jsonString);

        } else {
            throw new Error('Unsupported content type');
        }

        // console.log('Received body:', body);
        console.log('Received mac:', mac)
        validateMAC(mac!, body)

        // Validate required fields
        const requiredFields = ['shop', 'amount', 'currency', 'transaction', 'status'];
        for (const field of requiredFields) {
            if (!body[field]) {
                console.error(`Missing required field: ${field}`);
                return NextResponse.json(
                    { success: false, message: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Process the data (business logic)
        const { shop, amount, currency, transaction, status, reference, merchant_data, customer_name } = body;

        if (status === 'COMPLETED') {
            console.log(`Transaction ${transaction} completed successfully for shop ${shop}`);
            // Update order status in your database, send email, etc.
        } else if (status === 'CANCELLED' || status === 'EXPIRED') {
            console.log(`Transaction ${transaction} was cancelled or expired`);
            // Handle failed transaction
        } else {
            console.log(`Transaction ${transaction} is in status: ${status}`);
            // Handle other statuses
        }

        // Send a success response
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error('Error processing payment return:', error);
        return NextResponse.json(
            { success: false, message: "ERROR" || 'Internal server error' },
            { status: 500 }
        );
    }
}

