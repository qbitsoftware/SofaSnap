import { Address, addressSearch } from "@/lib/search-validation";
import { fetchSuggestions } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = addressSearch.safeParse(body);
        const zodErrors: Record<string, string> = {};

        if (result.error) {
            result.error.issues.forEach((issue) => {
                zodErrors[issue.path[0]] = issue.message;
            });
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        let fetchedSuggestions: Address[] = []
        if (result.data) {
            fetchedSuggestions = await fetchSuggestions(result.data.input, result.data.user_id);
        }

        return NextResponse.json({ data: fetchedSuggestions }, { status: 200 });
    } catch (error) {
        void error;
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}