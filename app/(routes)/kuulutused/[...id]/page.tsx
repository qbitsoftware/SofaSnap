import { fetchUserProduct } from '@/utils/supabase/queries/products';
import { redirect } from 'next/navigation';
import React from 'react';
import { AddProductForm } from '../../lisa-toode/components/addProductForm';
import { GetUserInfo } from '@/app/actions';
import { FetchCategories } from '@/utils/supabase/queries/categories';
import { ServerError } from '@/components/server-error';
import { TSignUpSchema } from '@/lib/register-validation';
import { Listing } from '@/types';
import { EditProduct } from './components/edit-product-form';



interface PageProps {
    params: {
        id?: string[];
    };
}

const Page = async ({ params }: PageProps): Promise<JSX.Element> => {
    const user = await GetUserInfo()
    const { data, error } = await FetchCategories()
    if (error == "Server error") {
        return <ServerError />
    } else if (error || !data) {
        redirect("/404")
    }
    if (!user.data.user) {
        redirect("/login")
    }

    const userInfo = user.data.user.user_metadata as TSignUpSchema
    if (Number(params.id) >= 0) {
        const prods = await fetchUserProduct(Number(params.id));

        if (prods.error || !prods.data) {
            redirect("/404")
        }

        const prod = prods.data[0].product
        const category = prods.data[0].categories
        let c = "";
        let c_sub = "";
        category.map((cat) => {
            let isMatch = false;

            data.map((category_to_find) => {
                if (category_to_find.sub_categories?.includes(cat.category_name_slug)) {
                    isMatch = true; // If found, set flag to true
                }
            });

            return isMatch ? c_sub = cat.category_name_slug : c = cat.category_name_slug;
        });

        const initData: Listing = {
            user_id: prod.user_id,
            name: prod.name,
            category: c,
            sub_category: c_sub,
            width: prod.width,
            heigth: prod.heigth,
            length: prod.length,
            material: prod.material,
            description: prod.description || undefined,
            start_date: prod.start_date ? new Date(prod.start_date) : undefined,
            end_date: prod.end_date ? new Date(prod.end_date) : undefined,
            type: prod.type || "",
            price: prod.price,
            address: "",
            all_img: prod.all_img || [],
        }


        return (
            <div className='flex flex-col md:flex-row xl:max-w-[1440px] w-full sm:px-[56px] pt-[30px] mx-auto'>
                <div className='flex flex-col justify-center items-center md:items-start md:justify-start'>
                    <div className='mb-[38px] hidden md:inline'>
                        <EditProduct />
                    </div>
                    <div className='min-w-[340px] max-w-[360px] sm:max-w-[400px] md:max-w-[500px]  md:ml-[135px] mb-[179px] w-full'>
                        <AddProductForm id={user.data.user.id} categories={data} user_metadata={userInfo} initialData={initData} address={prods.data[0].address} />
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div>
            Invalid ID
        </div>
    )

};

export default Page;
