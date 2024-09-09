import React from 'react'
import { Globe, Euro } from 'lucide-react'

const LanguageSelector = () => {
    return (
        <div className='flex items-center gap-[12px]'>
            <div className='flex items-center justify-center'>
                <Globe width={20} height={20}/>
                <h2 className='pl-[10px]'>Eesti</h2>
            </div>
            <div className='flex items-center justify-center '>
                <Euro width={20} height={20} />
                <h2 className='pl-[10px]'>EUR</h2>
            </div>
        </div>
      )
}

export { LanguageSelector }