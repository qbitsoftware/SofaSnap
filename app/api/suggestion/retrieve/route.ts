import { coordinateSearch } from "@/lib/search-validation";
import { fetchCoordinates } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const result = coordinateSearch.safeParse(body);
        const zodErrors: Record<string, string> = {};

        if (result.error) {
            result.error.issues.forEach((issue) => {
                zodErrors[issue.path[0]] = issue.message;
            });
            return NextResponse.json({ errors: zodErrors }, { status: 400 });
        }

        let fetchedCoordinates;
        if (result.data) {
            fetchedCoordinates = await fetchCoordinates(result.data.mapbox_id, result.data.user_id);
        }

        return NextResponse.json({ data: fetchedCoordinates }, { status: 200 });
    } catch (error) {
        void error;
        return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
    }
}