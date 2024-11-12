"use client"

import { addOrderAction } from '@/app/actions'
import { ServerError } from '@/components/server-error'
import { Button } from '@/components/ui/button'
import { calculatePrice } from '@/lib/utils'
import { CartItemWithDetails } from '@/utils/supabase/queries/cart'
import { OrderItemTS, OrderTS } from '@/utils/supabase/supabase.types'
import { redirect } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

interface CheckoutProps {
    cart: CartItemWithDetails[]
}


export const Checkout: React.FC<CheckoutProps> = ({ cart }) => {

    const handleCheckout = async (cart: CartItemWithDetails[]) => {
        try {
            const {data, error} = await addOrderAction(cart)
            console.log("DATA", data, "error", error)
            if (error && error == "Server error") {
                toast.error("Tekkis viga, proovige uuesti.")
            }
        } catch(error) {
            toast.error("Tekkis viga, proovige uuesti.")
        }
    }
    return (
        <div>
            <Button onClick={() => handleCheckout(cart)} className='bg-accent text-black px-10 py-6 mb-[20px] w-full sm:max-w-[200px]'>Maksma</Button>
        </div>
    )
}
