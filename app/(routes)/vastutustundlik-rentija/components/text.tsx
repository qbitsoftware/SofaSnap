import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'

export const Text = () => {
    return (
        <div className={cn('text-justify md:text-left w-full flex flex-col gap-5', poppins.className)}>
            <p className='md:w-[248px]'>Mööbli heaperemehelik kasutamine.</p>
            <p className='md:w-[239px]'>Hoidmine heas korras ja puhtana.</p>
            <p className='md:w-[594px]'>Rentija vastutab mööbli kahjustuste eest, välja arvatud normaalne kulumine.</p>
            <p className='md:w-[392px]'>Rendija kohustub hüvitama kõik tekitatud kahjud.</p>
            <p className='md:w-[470px]'>Rentijal on kohustus hankida kindlustus mööbli kahjustuste vastu.</p>
        </div>
    )
}

