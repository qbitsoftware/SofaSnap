import { NextResponse } from "next/server";
import { Notification } from "@/maksekeskus/maksekeskus_types";
import { changeOrderStatus, getOrder } from "@/utils/supabase/queries/orders";

export async function POST(req: Request) {
    try {
        const contentType = req.headers.get('content-type');

        let body: Notification;
        // let mac;
        if (contentType === 'application/x-www-form-urlencoded') {
            const text = await req.text();
            const params = new URLSearchParams(text);
            const jsonString = params.get('json');
            // mac = params.get('mac')

            if (!jsonString) {
                throw new Error('Missing "json" parameter in the body');
            }


            body = JSON.parse(jsonString);

        } else {
            throw new Error('Unsupported content type');
        }

        // const validMac = await validateMAC(mac!, body)
        // if (!validMac) {
        //     return NextResponse.json({ success: false }, { status: 500 })
        // }

        try {
            const result = await changeOrderStatus("", body.transaction, body.status)
            if (!result.data) {
                return NextResponse.json({ success: false }, { status: 500 });
            }
        } catch (error) {
            console.error(error)
            return NextResponse.json({ success: false }, { status: 500 });
        }

        const order = await getOrder(body.transaction)
        let redirectUrl;
        if (process.env.NODE_ENV === 'production') {
            redirectUrl = process.env.SITE_URL_PROD
        } else if (process.env.NODE_ENV === 'development') {
            redirectUrl = process.env.SITE_URL_DEV
        } else {
            throw Error('invalid url')
        }
        if (order.data) {
            return NextResponse.redirect(`${redirectUrl}/kassa?id=${order.data[0].id}`, { status: 302 })
        } else {
            return NextResponse.redirect(`${redirectUrl}/kassa`, { status: 302 })
        }
    } catch (error) {
        console.error('Error processing payment return:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

