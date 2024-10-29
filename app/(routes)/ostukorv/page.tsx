import { useCart } from '@/hooks/use-cart'
import { ChevronLeft, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { CartItemComponent } from './components/cart-item'
import { Separator } from '@/components/ui/separator'
import { RentingRules } from './components/renting-rules'
import { Button } from '@/components/ui/button'
import { differenceInCalendarDays } from 'date-fns'
import { round } from '@/utils/utils'
import Link from 'next/link'
import { getCart } from '@/utils/supabase/queries/cart'
import { GetUserInfo } from '@/app/actions'
import { redirect } from 'next/navigation'
import { CartItem } from '@/utils/supabase/supabase.types'
import { TotalPrice } from './components/total'

interface CartPageProps {
  cartItems: CartItem[]
}

const CartPage: React.FC<CartPageProps> = async ({ cartItems }) => {

  const user = await GetUserInfo()

  if (!user || !user.data.user?.id ) {
    redirect("/login")
  }

  const {getCartItems} = useCart(user.data.user?.id)

  const { data, error } = await getCartItems()

  return (
    <div className="">
      {
       data && data.length > 0 ?
          <div>
            <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
              <Link href={"/"}>
                <ChevronLeft strokeWidth={1} className='ml-[-16px]' color='#000000' size={44} />
              </Link>

              <div className='flex flex-col md:gap-[50px] md:mt-[90px] gap-[40px] mt-6 mb-[20px]'>
                {data.map((item) =>
                  <div className='' key={item.cart_item.id}>
                    <CartItemComponent cartItem={item.cart_item} product={item.product} user_id={user.data.user?.id!}/>
                  </div>)}
              </div>
            </div>
            <Separator className='w-full md:mt-[100px] bg-[#1E1E1E]/30' />
            <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
              <RentingRules />
            </div>
            <Separator className='w-full md:mt-[60px] bg-[#1E1E1E]/30' />
              <TotalPrice cartItems={data}/>
            <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px] flex md:flex-row gap-[10px] justify-end xl:my-[200px] my-[50px] md:my-[100px]'>
              <Button className='bg-[#D9D9D9] text-black px-10 py-6'>Katkesta</Button>
              {/* <Button onClick={() => { }} className='bg-accent text-black px-10 py-6 mb-[20px] w-full sm:max-w-[200px]'>Maksma</Button> */}
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