import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
    const { sessionId } = await req.json()

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === 'paid') {
            // Payment successful - update your database
            return NextResponse.json({
                success: true,
                session: {
                    id: session.id,
                    amount: session.amount_total,
                    currency: session.currency,
                    customer_email: session.customer_details?.email
                }
            })
        }

        return NextResponse.json({ success: false })
    } catch (error) {
        void error
        return NextResponse.json({ error: 'Invalid session' }, { status: 400 })
    }
}