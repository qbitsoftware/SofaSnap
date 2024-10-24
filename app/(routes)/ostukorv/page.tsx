"use client"

import useCart from '@/hooks/use-cart'
import { ChevronLeft, X } from 'lucide-react'
import React, { useState } from 'react'
import { CartItemComponent } from './components/cart-item'
import { Separator } from '@/components/ui/separator'
import { RentingRules } from './components/renting-rules'
import { Button } from '@/components/ui/button'

const CartPage = () => {

  const [totalCombined, setTotalCombined] = useState<number>(0)

  const cart = useCart()

  const items = cart.items

  const updateTotalCombined = (newTotal: number) => {
    
    setTotalCombined((prevTotal) => prevTotal + newTotal);
  };


  const handleRemoveItem = (id: number) => {
    cart.removeItem(id)
  }

  return (
    <div className="">
      <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
        <ChevronLeft strokeWidth={1} className='ml-[-16px]' color='#000000' size={44} />
        <div className='flex flex-col md:gap-[50px] md:mt-[90px]'>
          {items.map((item) =>
            <div className='flex justify-between' key={item.id}>
              <CartItemComponent item={item} updateTotalCombined={updateTotalCombined} />
              <X className='hover:cursor-pointer' onClick={() => handleRemoveItem(item.id)} />
            </div>)}
        </div>
      </div>
      <Separator className='w-full md:mt-[100px] bg-[#1E1E1E]' />
      <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
        <RentingRules />
      </div>
      <Separator className='w-full md:mt-[60px] bg-[#1E1E1E]' />
      <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
        <h3 className='font-semibold mt-6'>Summa kokku: {totalCombined}</h3>
      </div>
      <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px] flex md:flex-row gap-[10px] justify-end md:my-[200px]'>
        {/* <Button className='bg-[#D9D9D9] text-black px-10 py-6'>Katkesta</Button> */}
        <Button className='bg-accent text-black px-10 py-6'>Maksma</Button>
      </div>
    </div>
  )
}

export default CartPage