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
    <div className='grid grid-cols-2 lg:gap-x-20 xl:gap-x-[100px] lg:grid-cols-2 xl:grid-cols-3 md:gap-y-[100px]'>
        {products?.map((product) => (
          <div className='' key={product.id} onClick={() => router.push(`${path}/${product.id}`)}>
            <ProductCard className='w-[162px] h-[268px] lg:w-[312px] md:w-[265px] md:h-[410px]' product={product} />
          </div>
        ))}
    </div>
  )
}
