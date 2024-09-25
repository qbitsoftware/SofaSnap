import { productSchemaServer } from "@/lib/product-validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = productSchemaServer.safeParse(body);
        let zodErrors: Record<string, string> = {};


        if (result.error) {
            result.error.issues.forEach((issue) => {
                zodErrors[issue.path[0]] = issue.message;
                console.log(zodErrors)
            });
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        console.log("Successfull")
        console.log(result)

        return NextResponse.json({ data: "GOOOD" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}