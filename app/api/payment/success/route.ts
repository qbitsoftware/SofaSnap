import { validateMAC } from "@/lib/utils";
import { NextResponse } from "next/server";
import { Notification } from "@/maksekeskus/maksekeskus_types";
import { getOrder } from "@/utils/supabase/queries/orders";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get('content-type');

        let body: Notification;
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

        const validMac = await validateMAC(mac!, body)
        if (!validMac) {
            return NextResponse.json({ success: false }, { status: 500 })
        }

        const order = await getOrder(body.transaction)
        if (order.data) {
            return NextResponse.redirect("/kassa?id=", order.data[0].id)
        } else {
            return NextResponse.redirect("/kassa")
        }
    } catch (error) {
        console.error('Error processing payment return:', error);
        return NextResponse.json(
            { success: false, message: "ERROR" || 'Internal server error' },
            { status: 500 }
        );
    }
}

