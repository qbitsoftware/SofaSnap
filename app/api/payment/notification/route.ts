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
        if (contentType === 'application/x-www-form-urlencoded; charset=UTF-8') {
            console.log("Contnent type is url")
            const text = await req.text();
            const params = new URLSearchParams(text);
            const jsonString = params.get('json');
            mac = params.get('mac')

            if (!jsonString) {
                throw new Error('Missing "json" parameter in the body');
            }


            body = JSON.parse(jsonString);

        } else if (contentType == "application/json") {
            console.log("JSONN")
        } else {
            console.log("content type", contentType)
        }
        console.log("Body", body)
        console.log("mac", mac)
        return NextResponse.json({ success: true }, { status: 200 });
        //databse functons
    } catch (error) {
        console.error('Error reading request body:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}




