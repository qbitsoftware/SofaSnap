import { Product } from '@/utils/supabase/supabase.types'
import Image from 'next/image'
import React from 'react'

interface ProductImageProps {
  product: Product
}


export const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  return (
    <div className='bg-[#000000]/10 flex justify-center'>
      <div className='w-[50%]'>
        <Image
          // placeholder
          src={"/images/tool2.png"}
          alt={product.name}
          layout='intrinsic'
          width={531}
          height={500}
          objectFit='contain'
        />
      </div>
    </div>
  )
}