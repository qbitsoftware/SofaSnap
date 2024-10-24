"use client"

import { Separator } from '@/components/ui/separator'
import useCart from '@/hooks/use-cart'
import { CartItem } from '@/lib/product-validation'
import { product } from '@/utils/supabase/schema'
import { formatDate, round } from '@/utils/utils'
import { differenceInCalendarDays } from 'date-fns'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface CartItemProps {
  item: CartItem
}



export const CartItemComponent: React.FC<CartItemProps> = ({ item }) => {

  const [totalWithfee, setTotalWithFee] = useState<number>(0)
  const [totalWithoutFee, setTotalWithoutFee] = useState<number>(0)
  const [dateRange, setDateRange] = useState<number>(0)


  useEffect(() => {
    if (item) {
      handlePrice(item.dateRange.from, item.dateRange.to)
    }
  }, [item])

  const handlePrice = (from: Date, to: Date) => {
    const daysDif = differenceInCalendarDays(to, from) + 1
    setDateRange(daysDif)
    const totalwithoutfee = round(daysDif * item.price)
    const totalwithfee = round(totalwithoutfee * 1.05)
    setTotalWithoutFee(totalwithoutfee)
    setTotalWithFee(totalwithfee)
  }

  return (
    <div>
      <div className='flex gap-3'>
        <div>
          <Image className='rounded-3xl' src={item.preview_image} width={230} height={230} alt={item.name} />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='font-semibold text-base'>{item.name}</h2>
          <p className='text-[15px] font-normal'>{item.price}€<span className=''>{item.type == "rent" ? " Päev" : ""}</span></p>
          {item.type == "rent" &&
            <div className='flex flex-col gap-2 text-[15px] font-normal'>
              <p>Kuupäevad:</p>
              <p>{`${formatDate(new Date(item.dateRange.from))} - ${formatDate(new Date(item.dateRange.to))}`}</p>
              <Separator />
              <div className=''>
                <div className='flex flex-col gap-2 mb-2'>
                  {/* <h3 className='text-2xl font-semibold'>Hinnateave</h3> */}
                  <div className='flex gap-20 justify-between'>
                    <p>{`${item.price}€ x ${dateRange} Päeva`}</p>
                    <p className=''>{totalWithoutFee}€</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>SofaSnap teenustasu </p>
                    <p>{round(totalWithoutFee * 0.05)}€</p>
                  </div>
                </div>
                <Separator />
                <div className='flex justify-between font-semibold mt-2'>
                  <p>Kokku</p>
                  <p>{totalWithfee}€</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
