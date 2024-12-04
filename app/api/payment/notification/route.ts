import { GetUserInfo } from "@/app/actions";
import { validateMAC } from "@/lib/utils";
import { Notification } from "@/maksekeskus/maksekeskus_types";
import { completeOrder } from "@/utils/supabase/queries/orders";
import { NextResponse } from "next/server";
import { validate } from "uuid";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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
            if (mac &&  !await validateMAC(mac, body)) {
                return NextResponse.json({ success: false }, { status: 401 });
            }
            if (body.status == "COMPLETED") {
                try {
                    const res = await completeOrder(true, "", body.transaction)
                    if (!res.data) {
                        return NextResponse.json({ success: false }, { status: 500 });
                    }
                } catch (error) {
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





