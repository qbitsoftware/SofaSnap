"use client"

import { Product } from '@/utils/supabase/supabase.types'
import { formatDate } from '@/utils/utils'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { removeFromFavoritesAction } from '@/app/actions'
import Link from 'next/link'

interface FavoriteProps {
  product: Product
  user_id: string
}

export const FavoriteProduct: React.FC<FavoriteProps> = ({ product, user_id }) => {
  const router = useRouter()

  const handleRemoveItem = async (product_id: number, user_id: string) => {
    try {
      await removeFromFavoritesAction(product_id, user_id)
      router.refresh()
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  return (
    <div
      onClick={() => {
        router.push(`/tooted/${product.id}`)
      }}
      className='bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer'
    >
      <div className='flex justify-between'>
        <div className='flex gap-4 flex-1'>
          <div className='relative sm:w-[200px] sm:h-[150px] h-[120px] w-[120px] min-w-[120px] cursor-pointer group'>
            <Image
              className='rounded-xl absolute w-full h-full object-cover group-hover:opacity-90 transition-opacity'
              src={product.preview_image}
              fill
              alt={product.name}
            />
          </div>
          <div className='flex flex-col gap-3 flex-1'>
            <div>
              <Link href={`/tooted/productname/${product.id}`}>
                <h2 className='font-semibold text-lg mb-1 hover:text-primary transition-colors cursor-pointer'>{product.name}</h2>
              </Link>
              <div className='flex items-center gap-2'>
                <span className='bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium'>
                  {product.price}€{product.type == "rent" ? " / Päev" : ""}
                </span>
                {product.type && (
                  <span className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'>
                    {product.type === "rent" ? "Rent" : "Müük"}
                  </span>
                )}
              </div>
            </div>
            {product.type == "rent" && product.start_date && product.end_date && (
              <div className='bg-gray-50 rounded-lg p-3'>
                <p className='text-sm text-gray-600 mb-1'>Rendiperiood:</p>
                <p className='text-sm font-medium'>
                  {`${formatDate(new Date(product.start_date))} - ${formatDate(new Date(product.end_date))}`}
                </p>
              </div>
            )}

            <div className='flex flex-wrap gap-2 text-xs text-gray-500'>
              <span>Materjal: {product.material}</span>
              <span>•</span>
              <span>Mõõtmed: {product.length}×{product.width}×{product.heigth}cm</span>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleRemoveItem(product.id, user_id)
          }}
          className='p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors self-start'
          aria-label="Eemalda lemmikutest"
        >
          <X className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}
