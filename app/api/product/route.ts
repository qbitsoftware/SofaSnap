import { productSchemaServer } from "@/lib/product-validation";
import { addProduct, fetchAllProducts } from "@/utils/supabase/queries/products";
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

        const { error } = await addProduct(result.data)
        if (error) {
            console.log("error", error)
            return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
        }
        console.log("Successfull")
        console.log(result)

        return NextResponse.json({ data: "GOOOD" }, { status: 200 });
    } catch (error) {
        console.log("ERROR", error)
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}

export async function GET(req: Request, res:Response) {
    const page = req.query.page || 1;
    try {
      const products = await fetchAllProducts(Number(page)); // Add pagination logic in your query if needed
      return NextResponse.json({data: products},{status:200});
    } catch (error) {
        return NextResponse.json({"Server error"},{status:500});    }
  }