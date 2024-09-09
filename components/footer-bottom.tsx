import React from 'react'
import { Dot } from 'lucide-react'
import { LanguageSelector } from './language-selector'

const FooterBottom = () => {
  return (
    <div className='w-full justify-between flex h-[37px] text-white'>
        <div className='flex'>
            <div className='flex items-end p-[10px]'>
                <h2 className=''>Privaatsus</h2>
                <Dot />
            </div>
            <div className='flex items-end p-[10px]'>
                <h2>Tingimused</h2>
                <Dot />
            </div>
            <div className='flex items-end p-[10px]'>
                <h2>Ettevotte andmed</h2>
                <Dot />
            </div>
        </div>
        <div className='flex items-end p-[10px]'>
            <LanguageSelector />
        </div>
    </div>
  )
}

export { FooterBottom }