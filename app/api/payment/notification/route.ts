import { validateMAC } from "@/lib/utils";
import { Notification } from "@/maksekeskus/maksekeskus_types";
import { changeOrderStatus, completeOrder } from "@/utils/supabase/queries/orders";
import { NextResponse } from "next/server";
import { sendEmailAction } from "@/app/actions";


export async function POST(req: Request) {
    try {
        const contentType = req.headers.get('content-type');
        let mac;
        if (contentType === 'application/x-www-form-urlencoded; charset=UTF-8') {
            const text = await req.text();
            const params = new URLSearchParams(text);
            const jsonString = params.get('json');
            mac = params.get('mac')

            if (!jsonString) {
                throw new Error('Missing "json" parameter in the body');
            }

            const body: Notification = JSON.parse(jsonString);
            if (mac && !await validateMAC(mac, body)) {
                return NextResponse.json({ success: false }, { status: 401 });
            }

            if (body.status == "COMPLETED") {
                try {
                    const res = await completeOrder("", body.transaction)
                    if (!res.data) {
                        return NextResponse.json({ success: false }, { status: 500 });
                    }
                    await sendEmailAction("37612a@gmail.com", "Ostukinnitus", "<h1>Suurait2h et te ostsiste mei kaest nori manti, tulge homme jalle</h1>")
                } catch (error) {
                    console.error(error)
                    return NextResponse.json({ success: false }, { status: 500 });
                }
            } else {
                try {
                    const res = await changeOrderStatus("", body.transaction, body.status)
                    if (!res.data) {
                        return NextResponse.json({ success: false }, { status: 500 });
                    }
                } catch (error) {
                    console.error(error)
                    return NextResponse.json({ success: false }, { status: 500 });
                }
            }
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error reading request body:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}


// {
//     amount: '52.5',
//     currency: 'EUR',
//     customer_name: 'Tõõger Leõpäöld',
//     merchant_data: null,
//     message_time: '2024-12-04T08:32:58+0000',
//     message_type: 'payment_return',
//     reference: null,
//     shop: 'e3dcd8e4-a4d2-4659-99dc-4b2ec79dbd7f',
//     signature: '7BB21984C695AE44E0B1B21528366BB7B63CA0C7FEB141D77FBAEB2A40D1EF1A24396550C20B39C72DF847E6371CC3A6E7A16C3F37145ED25DC53A753067E7C6',
//     status: 'COMPLETED',
//     transaction: '70786723-a296-490e-80aa-c24d3b94d1f5'
//   }


