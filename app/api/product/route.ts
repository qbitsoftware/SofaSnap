import { productSchema } from "@/lib/product-validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = productSchema.safeParse(body);
        let zodErrors: Record<string, string> = {};

        if (result.error) {
            result.error.issues.forEach((issue) => {
                zodErrors[issue.path[0]] = issue.message;
            });
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        console.log("Successfull")

        return NextResponse.json({ data: "GOOOD" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}