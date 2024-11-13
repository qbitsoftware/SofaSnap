"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

export const SearchButton = () => {
    const onInput = () => {
    }
    return (
        <Button
            onClick={() => onInput()}
            className='bg-accent absolute right-[6px] rounded-3xl xl:rounded-full w-[123px] md:h-[43px] top-[5px] xl:h-[55px] hover:bg-[#f07162]'
        >
            Otsi
        </Button>
    )
}
