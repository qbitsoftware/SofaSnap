"use client"

import { ProductCard } from '@/components/product-card'
import { Product } from '@/utils/supabase/supabase.types'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

interface ProductsProps {
    products: Product[] | null
}

export const Products:React.FC<ProductsProps> = ({products}) => {

  const router = useRouter()
  const path = usePathname()


  return (
    <div className='grid grid-cols-2 lg:gap-x-20 justify-between xl:gap-x-[100px] lg:grid-cols-2 xl:grid-cols-3  md:gap-y-[100px] gap-y-[35px] gap-x-[10px]'>
        {products?.map((product) => (
          <div className='w-full h-full' key={product.id} onClick={() => router.push(`${path}/${product.id}`)}>
            <ProductCard className='w-full h-[268px]  md:h-[410px]' product={product} />
          </div>
        ))}
    </div>
  )
}
