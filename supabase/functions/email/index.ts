// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { send } from "https://deno.land/x/smtp/mod.ts"

Deno.serve(async (req) => {
  try {
    const { name, email, orderItems, total } = await req.json()

    const subject = `Order Confirmation - Thank you for your purchase!`
    const message = `
      Hi ${name},

      Thank you for your purchase! Here are your order details:

      ${orderItems.map(item => `- ${item.name}: $${item.price} x ${item.quantity}`).join("\n")}

      Total: $${total}

      We appreciate your business!

      Best regards,
      Your Company
    `

    // SMTP Configuration
    await send({
      hostname: "mail.veebimajutus.ee",
      port: 465,
      username: Deno.env.get("SMTP_USERNAME"),
      password: Deno.env.get("SMTP_PASSWORD"),
      from: Deno.env.get("SMTP_FROM"),
      to: email,
      subject,
      content: message,
    })

    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Email sending failed:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/email' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
