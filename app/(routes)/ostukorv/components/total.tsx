"use client"

import { calculatePrice } from '@/lib/utils';
import { CartItemWithDetails } from '@/utils/supabase/queries/cart';
import { round } from '@/utils/utils';
import { differenceInCalendarDays } from 'date-fns';
import React, { useEffect, useState } from 'react'

interface TotalPriceProps {
    cartItems: CartItemWithDetails[]
}


export const TotalPrice: React.FC<TotalPriceProps> = ({ cartItems }) => {

    const [totalCombined, setTotalCombined] = useState<number>(0)

    useEffect(() => {
       const {price, fee, total} = calculatePrice(cartItems)

        setTotalCombined(total);
    }, [cartItems]);


    return (
        <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
            <h3 className='font-semibold md:my-6 my-[12px] text-2xl'>Summa kokku: {totalCombined}€</h3>
        </div>
    )
}
