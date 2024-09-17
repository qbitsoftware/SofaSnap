import { GetUserInfo } from "@/app/actions";
import { registerValidator } from "@/lib/register-validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = registerValidator.safeParse(body);
        let zodErrors: Record<string, string> = {};

        if (result.error) {
            result.error.issues.forEach((issue) => {
                zodErrors[issue.path[0]] = issue.message;
            });
        }

        await new Promise(resolve => setTimeout(resolve, 2000));

        return NextResponse.json(
            Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true }
        );
    } catch (error) {
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const result = await GetUserInfo()
        if (result.error) {
            return NextResponse.json({ error: "Error" + result.error.message }, { status: Number(result.error.code) })
        }
        return NextResponse.json({ data: result.data })
    } catch (error) {
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
