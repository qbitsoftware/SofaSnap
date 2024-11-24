"use client"

import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import { CartItem, Product } from '@/utils/supabase/supabase.types'
import { formatDate, round } from '@/utils/utils'
import { differenceInCalendarDays } from 'date-fns'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface CartItemProps {
  cartItem: CartItem
  product: Product
  user_id: string
}



export const CartItemComponent: React.FC<CartItemProps> = ({ cartItem, product, user_id }) => {

  void user_id

  const router = useRouter()

  const [totalWithfee, setTotalWithFee] = useState<number>(0)
  const [totalWithoutFee, setTotalWithoutFee] = useState<number>(0)
  const [dateRange, setDateRange] = useState<number>(0)
  const { removeItemFromCart } = useCart()


  useEffect(() => {
    const handleRentPrice = (from: Date, to: Date) => {
      const daysDif = differenceInCalendarDays(to, from) + 1
      setDateRange(daysDif)
      const totalwithoutfee = round(daysDif * product.price)
      const totalwithfee = round(totalwithoutfee * 1.05)
      setTotalWithoutFee(totalwithoutfee)
      setTotalWithFee(totalwithfee)
    }

    const handleSellPrice = () => {
      const totalwithoutfee = product.price
      const totalwithfee = round(totalwithoutfee * 1.05)
      setTotalWithoutFee(totalwithoutfee)
      setTotalWithFee(totalwithfee)
    }

    if (cartItem && cartItem.from && cartItem.to) {
      handleRentPrice(cartItem.from, cartItem.to)
    } else if (cartItem) {
      handleSellPrice()
    }
  }, [cartItem, product.price])



  const handleRemoveItem = async (cart_item_id: number, cart_id: number) => {
    await removeItemFromCart(cart_item_id, cart_id)
    router.refresh()
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
          {product.type == "rent" && cartItem.from && cartItem.to
            ?
            <div className='flex flex-col gap-2 text-[15px] font-normal sm:w-[230px] w-[140px]'>
              {/* <p>Kuupäevad:</p> */}
              <p>{`${formatDate(new Date(cartItem.from))} - ${formatDate(new Date(cartItem.to))}`}</p>
              <Separator />
              <div className=''>
                <div className='flex flex-col gap-2 mb-2'>
                  {/* <h3 className='text-2xl font-semibold'>Hinnateave</h3> */}
                  <div className='flex justify-between'>
                    <p>{`${product.price}€ x ${dateRange} Päeva`}</p>
                    <p className=''>{totalWithoutFee}€</p>
                  </div>
                  <div className='flex justify-between'>
                    <p>Seatly teenustasu </p>
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
            :
            <div className='sm:w-[230px] w-[140px]'>
              <div className='flex justify-between  text-[15px]'>
                <p>Seatly teenustasu </p>
                <p>{round(totalWithoutFee * 0.05)}€</p>
              </div>
              <Separator />
              <div className='flex justify-between font-semibold mt-2'>
                <p>Kokku</p>
                <p>{totalWithfee}€</p>
              </div>
            </div>
          }
        </div>
      </div>
      <X className='hover:cursor-pointer' onClick={() => handleRemoveItem(cartItem.id, cartItem.cart_id)} />
    </div>
  )
}
