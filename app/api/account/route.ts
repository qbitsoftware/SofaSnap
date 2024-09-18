import { passwordChangeValidator, updateInformation } from "@/lib/register-validation";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        const result = passwordChangeValidator.safeParse(body);
        let zodErrors: Record<string, string> = {};

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                zodErrors[issue.path[0]] = issue.message;
            });
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        const supabase = createClient();

        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({ error: 'User authentication failed' }, { status: 401 });
        }


        const { error: updateError } = await supabase.auth.updateUser({
            password: result.data.password,
        });

        if (updateError) {
            if (updateError.code === "same_password") {
                return NextResponse.json({ error: "New password can't be the old one!" }, { status: 200 });
            }
            return NextResponse.json({ error: 'Unexpected error occurred: ' + updateError.message }, { status: 500 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = updateInformation.safeParse(body);
        let zodErrors: Record<string, string> = {};

        if (!result.success) {
            result.error.issues.forEach((issue) => {
                zodErrors[issue.path[0]] = issue.message;
            });
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        const supabase = createClient();

        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json({ error: 'User authentication failed' }, { status: 401 });
        }


        const { error: updateError } = await supabase.auth.updateUser({
            data: {
                first_name: result.data.first_name,
                last_name: result.data.last_name,
                phone: result.data.phone,
                address: result.data.address,
                agreement: result.data.agreement,
            }
        });

        if (updateError) {
            return NextResponse.json({ error: 'Unexpected error occurred: ' + updateError.message }, { status: 500 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}



