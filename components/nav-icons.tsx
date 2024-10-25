"use client"
import React from 'react'
import { CircleUser, Globe, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import Profile from './nav-bar-profile'
import { motion } from 'framer-motion'
import { User } from '@/utils/supabase/supabase.types'
import useCart from '@/hooks/use-cart'

interface NavIconsProps {
    user: User | null
}
const NavIcons = ({ user }: NavIconsProps) => {
    const cart = useCart()
    return (
        <div className="w-[132px] flex justify-center  gap-[19px] py-[6px]">
            <motion.div
                className=''
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link href={"/lisa-toode"}>
                    <Globe width={31} height={31} />
                </Link>
            </motion.div>
            <div className=''>
                {user ?
                    <Profile user={user} />
                    :
                    <div>
                        <Link href={"/login"}>
                            <CircleUser className="h-[32px] w-[32px] cursor-pointer hover:scale-105" />
                        </Link>
                    </div>
                }
            </div>
            <motion.div
                className=''
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {cart.items.length > 0 &&
                    <Link href={"/ostukorv"} className='relative'>
                        <ShoppingCart width={31} height={31} />
                        <div className='bg-accent absolute w-4 h-4 rounded-full top-0 right-[-5px] flex items-center justify-center'><span className='z-50 text-sm'>{cart.items.length} </span></div>
                    </Link>
                }

            </motion.div>
        </div>
    )
}

export { NavIcons }