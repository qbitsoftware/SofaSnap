import React from 'react'
import { Dot } from 'lucide-react'
import { LanguageSelector } from './language-selector'

const FooterBottom = () => {
    return (
        <div className='w-full md:justify-between flex md:h-[47px] justify-center items-center md:items-start text-white flex-col md:flex-row'>
            <div className='flex order-2 md:order-1 text-sm md:text-base'>
                <div className='flex text-[12px] items-end p-[10px]'>
                    <h2 className=''>Privaatsus</h2>
                    <Dot />
                </div>
                <div className='flex text-[12px] items-end p-[10px]'>
                    <h2>Tingimused</h2>
                    <Dot />
                </div>
                <div className='flex text-[12px] items-end p-[10px] '>
                    <h2>Ettevotte andmed</h2>
                    <Dot />
                </div>
            </div>
            {/* <div className='flex items-end p-[10px] pb-0 md:pb-[10px] order-1 md:order-2'>
                <LanguageSelector />
            </div> */}
        </div>
    )
}

export { FooterBottom }