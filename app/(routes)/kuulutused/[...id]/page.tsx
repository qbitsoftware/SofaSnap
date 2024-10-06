import { fetchUserProduct } from '@/utils/supabase/queries/products';
import { redirect } from 'next/navigation';
import React from 'react';

interface PageProps {
    params: {
        id?: string[];
    };
}

const Page = async ({ params }: PageProps): Promise<JSX.Element> => {
    if (Number(params.id) >= 0) {
        const prods = await fetchUserProduct(Number(params.id));
        if (prods.error) {
            redirect("/404")
        }
        return (
            <div>
                <h1>Product Page</h1>
                <p>Fetched Products: {JSON.stringify(prods)}</p>
            </div>
        );

    }

    return (
        <div>
            Invalid ID
        </div>
    )

};

export default Page;
