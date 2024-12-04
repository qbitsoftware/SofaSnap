"use client"

import { addOrderAction } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CartItemWithDetails } from '@/utils/supabase/queries/cart'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface CheckoutProps {
    cart: CartItemWithDetails[]
}


export const Checkout: React.FC<CheckoutProps> = ({ cart }) => {
    const router = useRouter()
    const [agreed, setAgreed] = useState<boolean>(false)

    useEffect(() => {
        const consent = localStorage.getItem("terms-and-conditions")
        if (consent === "accepted") {
            setAgreed(true)
        } else {
            setAgreed(false)
        }
    }, []) 

    const handleAgreement = (isChecked: boolean) => {
        if (isChecked) {
            localStorage.setItem("terms-and-conditions", "accepted")
        } else {
            localStorage.setItem("terms-and-conditions", "rejected")
        }
        setAgreed(isChecked)
    }


    // const handleCheckout = async (cart: CartItemWithDetails[]) => {
    //     try {
    //         const { error } = await addOrderAction(cart)
    //         if (error && error == "Server error") {
    //             toast.error("Tekkis viga, proovige uuesti.")
    //         }
    //         router.push("/kassa")
    //     } catch (error) {
    //         void error;
    //         toast.error("Tekkis viga, proovige uuesti.")
    //     }
    // }
    return (
        <div className='flex flex-col gap-[10px] items-end justify-end'>
            <div className="flex items-center space-x-2 mb-4 md:mb-0 ">
                <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(checked:boolean) => handleAgreement(checked)}
                />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Olen tutvunud ja nõustun <Link href="/muugitingimused" className='text-primary underline'>ostueeskirja</Link> ja <Link href="/privaatsuspoliitika" className='text-primary underline'>privaatsuspoliitikaga</Link>
                </label>
            </div>
            <Button disabled={!agreed} onClick={() => router.push("/kassa")} className='bg-accent text-black px-10 py-6 mb-[20px] w-full sm:max-w-[200px]'>Maksma</Button>
        </div>
    )
}
