import { Product } from '@/utils/supabase/supabase.types'
import Image from 'next/image'
import React from 'react'

interface ProductImageProps {
    product: Product
}


export const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  return (
    <div className='w-full bg-[#000000]/10 flex justify-center'>
      <Image 
        src={product.preview_image} 
        alt={product.name} 
        layout='intrinsic' 
        width={700}
        height={500}
        objectFit='contain'
      />
    </div>
  )
}