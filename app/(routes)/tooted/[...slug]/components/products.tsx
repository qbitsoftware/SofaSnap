import { ProductCard } from '@/components/product-card'
import { Product } from '@/utils/supabase/supabase.types'
import React from 'react'

interface ProductsProps {
    products: Product[] | null
}

export const Products:React.FC<ProductsProps> = ({products}) => {
  return (
    <div className='grid md:grid-cols-2 lg:gap-x-20 xl:gap-x-[100px] lg:grid-cols-2 xl:grid-cols-3 md:gap-y-[100px]'>
        {products?.map((product) => (
            <ProductCard key={product.id} className='lg:w-[312px] md:w-[265px] md:h-[410px]' product={product} />
        ))}
    </div>
  )
}
