import { updateInformationClient } from "@/lib/register-validation";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = updateInformationClient.safeParse(body);
        const zodErrors: Record<string, string> = {};

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

        const { error: updateError } = await supabase.auth.updateUser({
            data
        });

        if (updateError) {
            return NextResponse.json({ error: 'Unexpected error occurred: ' + updateError.message }, { status: 500 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        void error;
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}



