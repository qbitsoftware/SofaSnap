import { NextResponse } from "next/server";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(req: Request) {
    try {
        const body = await req.json()

        console.log('Received body:', body);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error reading request body:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

