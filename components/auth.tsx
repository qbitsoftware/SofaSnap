"use client"

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { LoginGoogle } from './google-login'

interface AuthProps {
    className: string
}

export const Auth:React.FC<AuthProps> = ({className}) => {
    return (
        <div className={cn('md:flex md:gap-[10px]', className)}>
            <Button
                className='md:w-[130px] md:h-[44px] bg-background hover:bg-background border-[1px] border-[#D2D5DA]'
            >
                <Image src={"/icons/apple.svg"} alt='apple' width={20} height={24} />
            </Button>
            <Button
                className='md:w-[130px] md:h-[44px] bg-background hover:bg-background border-[1px] border-[#D2D5DA]'
            >
                <Image src={"/icons/facebook.svg"} alt='facebook' width={20} height={24} />
            </Button>
            <LoginGoogle />
        </div>
    )
}
