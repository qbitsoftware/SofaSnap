"use client"

import { Button } from '@/components/ui/button'
import { CartItemWithDetails } from '@/utils/supabase/queries/cart'
import React from 'react'

interface CheckoutProps {
    cart: CartItemWithDetails[]
}


export const Checkout:React.FC<CheckoutProps> = ({cart}) => {

    const handleCheckout = async (cart: CartItemWithDetails[]) => {
        void cart

    }
    return (
        <div>
            <Button onClick={() => handleCheckout(cart)} className='bg-accent text-black px-10 py-6 mb-[20px] w-full sm:max-w-[200px]'>Maksma</Button>
        </div>
    )
}
