"use client"

import useCart from '@/hooks/use-cart'
import { ChevronLeft, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { CartItemComponent } from './components/cart-item'
import { Separator } from '@/components/ui/separator'
import { RentingRules } from './components/renting-rules'
import { Button } from '@/components/ui/button'
import { differenceInCalendarDays } from 'date-fns'
import { round } from '@/utils/utils'
import Link from 'next/link'

const CartPage = () => {

  const [totalCombined, setTotalCombined] = useState<number>(0)

  const cart = useCart()

  const items = cart.items

  useEffect(() => {

    const totalPrice = items.reduce((acc, item) => {
      const daysDif = differenceInCalendarDays(item.dateRange.to, item.dateRange.from) + 1
      const rentalDays = daysDif | 0;
      return acc + (round(item.price * rentalDays));
    }, 0);

    const totalWithFee = round(totalPrice * 1.05);

    setTotalCombined(totalWithFee);
  }, [items]);

  const handleRemoveItem = (id: number) => {
    cart.removeItem(id)
  }

  return (
    <div className="">
      {
        items.length > 0 ?
          <div>
            <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
              <Link href={"/"}>
                <ChevronLeft strokeWidth={1} className='ml-[-16px]' color='#000000' size={44} />
              </Link>

              <div className='flex flex-col md:gap-[50px] md:mt-[90px] gap-[40px] mt-6 mb-[20px]'>
                {items.map((item) =>
                  <div className='flex justify-between' key={item.id}>
                    <CartItemComponent item={item} />
                    <X className='hover:cursor-pointer' onClick={() => handleRemoveItem(item.id)} />
                  </div>)}
              </div>
            </div>
            <Separator className='w-full md:mt-[100px] bg-[#1E1E1E]/30' />
            <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
              <RentingRules />
            </div>
            <Separator className='w-full md:mt-[60px] bg-[#1E1E1E]/30' />
            <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
              <h3 className='font-semibold md:my-6 my-[12px] text-2xl'>Summa kokku: {totalCombined}€</h3>
            </div>
            <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px] flex md:flex-row gap-[10px] justify-end xl:my-[200px] my-[50px] md:my-[100px]'>
              {/* <Button className='bg-[#D9D9D9] text-black px-10 py-6'>Katkesta</Button> */}
              <Button className='bg-accent text-black px-10 py-6 mb-[20px] w-full sm:max-w-[200px]'>Maksma</Button>
            </div>
          </div>
          :
          <div className='w-full md:px-[64px] max-w-[1440px] md:mx-auto px-6'>
            <h1 className='md:text-5xl text-3xl text-center font-semibold md:mt-[100px]'>Sinu ostukorv on tühi</h1>
            <div className='flex flex-col gap-4 mx-auto justify-center items-center mt-10'>
              <Link href={"/tooted"} className='w-full max-w-[640px]'>
                 <Button className='py-6  w-full bg-accent text-black mx-auto'>Vaata tooteid</Button>
              </Link>
              <Link href={"/"} className='w-full max-w-[640px]'>
                <Button className='py-6  w-full bg-secondary mx-auto'>Mine kodulehele</Button>
              </Link>
            </div>
          </div>
      }
    </div>
  )
}

export default CartPage