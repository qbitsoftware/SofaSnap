"use client"

import React from 'react'
import { LoginGoogle } from './google-login'

export const Auth: React.FC = () => {
    return (
        <div className='flex gap-[10px] mt-10 w-full items-center justify-center'>
            {/* <Button
                className='w-[80px] md:w-[130px] h-[44px] bg-background hover:bg-background border-[1px] border-[#D2D5DA]'
            >
                <Image src={"/icons/apple.svg"} alt='apple' width={24} height={24} />
            </Button> */}
            {/* <LoginFacebook /> */}
            <LoginGoogle />
        </div>
    )
}
