import { fetchCategories } from "@/utils/supabase/queries/categories";
import { Category } from "@/utils/supabase/supabase.types";
import React from "react";

// Define the type for the category object


export default async function Layout({
    children,
}: {
    children: React.ReactNode;
    params: { storeid: string }
}) {


    const categories = await new Promise<Category[]>((resolve) => {
        setTimeout(async () => {
            const fetchedCategories = await fetchCategories();
            resolve(fetchedCategories);
        }, 500);
    });

    if (!categories || categories.length === 0) {
        return <div>Error loading categories</div>;
    }

    return (
        <>
            <div className="px-[24px] md:px-[56px]">
                {/* <Navbar categories={categories} /> */}
            </div>
            {children}
        </>
    );
}

