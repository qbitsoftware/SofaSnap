"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

export const SearchButton = () => {
    const onInput = () => {
        console.log("tere")
    }
    return (
        <Button
            onClick={() => onInput()}
            className='bg-[#f07162] absolute right-[6px] rounded-3xl xl:rounded-full w-[123px] md:h-[43px] top-[5px] xl:h-[55px] hover:bg-[#f07162]'
        >
            Otsi
        </Button>
    )
}
