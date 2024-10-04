"use client"

import { ProductCard } from '@/components/product-card'
import { Product } from '@/utils/supabase/supabase.types'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface ProductsProps {
    products: Product[] | null
}

export const Products: React.FC<ProductsProps> = ({ products }) => {

    const router = useRouter()
    const path = usePathname()

    return (
        <div className='grid grid-cols-2 justify-between xl:gap-x-[100px] lg:grid-cols-3 xl:grid-cols-3 md:gap-y-[100px] gap-y-[35px] gap-x-[10px]'>
            {products?.map((product, index) => (
                <div
                    className={`w-[95%] aspect-[312/410] sm:w-[225px] md:w-[270px] lg:w-[250px] xl:w-[280px] flex justify-center items-center 
                    ${index % 2 === 0 ? 'justify-self-start lg:justify-self-center' : 'justify-self-end lg:justify-self-center'}`}
                    key={product.id}
                    onClick={() => router.push(`${path}/${product.id}`)}
                >
                    <ProductCard className='w-full h-full' product={product} />
                </div>
            ))}
        </div>
    )
}
