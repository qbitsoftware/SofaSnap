import { registerValidator } from "@/lib/register-validation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const origin = headers().get("origin");


        const result = registerValidator.safeParse(body);
        const zodErrors: Record<string, string> = {};


        if (result.error) {
            result.error.issues.forEach((issue) => {
                zodErrors[issue.path[0]] = issue.message;
            });
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        if (result.data) {
            const supabase = createClient();
            let data;
            if (result.data.userType === 'Eraisik') {
                data = {
                    first_name: result.data.first_name,
                    last_name: result.data.last_name,
                    address: result.data.address,
                    phone: result.data.phone,
                    agreement: result.data.agreement,
                    userType: result.data.userType,
                    role: 0,

                }
            } else {
                data = {
                    company_name: result.data.company_name,
                    registry_code: result.data.registry_code,
                    vat_number: result.data.vat_number,
                    phone: result.data.phone,
                    contact_person: result.data.contact_person,
                    agreement: result.data.agreement,
                    userType: result.data.userType,
                    role: 0,
                }
            }

            const { error } = await supabase.auth.signUp({
                email: result.data.email,
                password: result.data.password,
                options: {
                    emailRedirectTo: `${origin}/auth/callback`,
                    //add our own custom metrics to user
                    data
                },
            });
            console.log("result", result.data)

            if (error) {
                return NextResponse.json({ error: 'Unexpected error occurred' + error, code: error.code }, { status: 500 });
            } else {
                return NextResponse.json({ success: true }, { status: 200 })
            }
        }

        return NextResponse.json(
            Object.keys(zodErrors).length > 0 ? { errors: zodErrors } : { success: true }
        );
    } catch (error) {
        void error;
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}
