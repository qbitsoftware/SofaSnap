"use client"

import { Separator } from '@/components/ui/separator'
import { Product } from '@/utils/supabase/supabase.types'
import { formatDate } from '@/utils/utils'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { removeFromFavoritesAction } from '@/app/actions'

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
    <div className='flex justify-between'>
      <div className='flex gap-3'>
        <div className='relative sm:w-[230px] sm:h-[230px]  h-[130px] w-[130px] min-w-[130px]'>
          <Image className='rounded-3xl absolute w-full h-full' src={product.preview_image} fill alt={product.name} />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='font-semibold text-base'>{product.name}</h2>
          <p className='text-[15px] font-normal'>{product.price}€<span className=''>{product.type == "rent" ? " Päev" : ""}</span></p>
          {product.type == "rent" && product.start_date && product.end_date
            ?
            <div className='flex flex-col gap-2 text-[15px] font-normal sm:w-[230px] w-[140px]'>
              {/* <p>Kuupäevad:</p> */}
              <p>{`${formatDate(new Date(product.start_date))} - ${formatDate(new Date(product.end_date))}`}</p>
              <Separator />
              <div className=''>
                <div className='flex flex-col gap-2 mb-2'>
                  {/* <h3 className='text-2xl font-semibold'>Hinnateave</h3> */}
                  <div className='flex justify-between'>
                    {/* <p>{`${product.price}€ x ${dateRange} Päeva`}</p> */}
                    {/* <p className=''>{totalWithoutFee}€</p> */}
                  </div>
                  <div className='flex justify-between'>
                    <p>Seatly teenustasu </p>
                    {/* <p>{round(totalWithoutFee * 0.15)}€</p> */}
                  </div>
                </div>
                <Separator />
                <div className='flex justify-between font-semibold mt-2'>
                  <p>Kokku</p>
                  {/* <p>{totalWithfee}€</p> */}
                </div>
              </div>
            </div>
            :
            <div className='sm:w-[230px] w-[140px]'>
              <div className='flex justify-between  text-[15px]'>
                <p>Seatly teenustasu </p>
                {/* <p>{round(totalWithoutFee * 0.15)}€</p> */}
              </div>
              <Separator />
              <div className='flex justify-between font-semibold mt-2'>
                <p>Kokku</p>
                {/* <p>{totalWithfee}€</p> */}
              </div>
            </div>
          }
        </div>
      </div>
      <X className='hover:cursor-pointer' onClick={() => handleRemoveItem(product.id, user_id)} />
    </div>
  )
}
