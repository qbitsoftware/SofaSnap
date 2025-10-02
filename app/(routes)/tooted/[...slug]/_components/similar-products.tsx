"use client"

import { Product } from '@/utils/supabase/supabase.types'
import React from 'react'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'

interface SimilarProductsProps {
  products: Product[]
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({ products }) => {
  const similarProducts = products.slice(0, 4)

  if (similarProducts.length === 0) {
    return null
  }

  return (
    <div className='bg-[#F5F5F5] py-12 md:py-16'>
      <div className='max-w-[1440px] mx-auto px-6 md:px-16'>
        <h2 className='text-2xl md:text-3xl font-semibold mb-8'>Sarnased tooted</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
          {similarProducts.map((product) => (
            <Link key={product.id} href={`/tooted/${product.id}`}>
              <ProductCard product={product} className='w-full' />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
