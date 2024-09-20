import React from 'react'
import { ProductCarousel } from './product-carousel'
import { createClient } from '@/utils/supabase/server'
import { fetchAllProducts } from '@/utils/supabase/queries/products'


const RecentProducts = async () => {

    const supabase = createClient()

    const { data, error } = await fetchAllProducts()

    return (
        <div className='relative md:h-[645px] bg-background w-full flex gap-10 md:flex-col items-center justify-center'>
            <h2 className='md:text-5xl font-medium max-w-[1360px] mx-auto w-[80%] xl:w-[83%] 2xl:w-[80%] text-left'>Viimati vaadatud</h2>
            {!error && data
                ? <ProductCarousel className='' products={data} />
                : <div></div>
            }
        </div>
    )
}

export default RecentProducts