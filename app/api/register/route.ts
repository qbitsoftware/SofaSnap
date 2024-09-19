import { registerValidatorServer } from "@/lib/register-validation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const origin = headers().get("origin");


        const result = registerValidatorServer.safeParse(body);
        let zodErrors: Record<string, string> = {};


        if (result.error) {
            result.error.issues.forEach((issue) => {
                zodErrors[issue.path[0]] = issue.message;
            });
            console.log("this is error", zodErrors)
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        if (result.data) {
            const supabase = createClient();
            //register logic
            const { error } = await supabase.auth.signUp({
                email: result.data.email,
                password: result.data.password,
                options: {
                    emailRedirectTo: `${origin}/auth/callback`,
                    //add our own custom metrics to user
                    data: {
                        first_name: result.data.first_name,
                        last_name: result.data.last_name,
                        // address: result.data.address,
                        phone: result.data.phone,
                        agreement: result.data.agreement,

                    },
                },
            });

            if (error) {
                console.log("Error", error)
                return NextResponse.json({ error: 'Unexpected error occurred' + error, code: error.code }, { status: 500 });
            } else {
                console.log("koik lkas hasti")
                return NextResponse.json({ success: true }, { status: 200 })
            }
        }

        return NextResponse.json(
            Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
