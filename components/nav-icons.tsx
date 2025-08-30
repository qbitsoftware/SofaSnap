"use client"
import React from 'react'
import { CircleUser, Plus, Star } from 'lucide-react'
import Link from 'next/link'
import Profile from './nav-bar-profile'
import { motion } from 'framer-motion'
import { TSignUpSchema } from '@/lib/register-validation'

interface NavIconsProps {
    user: TSignUpSchema | undefined
    favorites: number
}
const NavIcons = ({ user, favorites }: NavIconsProps) => {

    return (
        <div className="md:w-[100px] lg:w-[132px] flex justify-center  gap-[19px] py-[6px]">
            <motion.div
                className='md:hidden lg:inline'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link href={"/lisa-toode"}>
                    <Plus width={31} height={31} />
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
                <Link href={"/lemmikud"} className='relative'>
                    <Star width={31} height={31} />
                    {favorites > 0 &&
                        <div className='bg-accent absolute w-4 h-4 rounded-full top-0 right-[-5px] flex items-center justify-center'><span className='z-50 text-sm'>{favorites} </span></div>
                    }
                </Link>

            </motion.div>
        </div>
    )
}

export { NavIcons }