import Image from 'next/image'
import React from 'react'

export const Globe = () => {
    return (
        <div className='flex items-center justify-center w-full md:w-[80%] xl:w-[60%] mb-[-12.3%] md:mb-[-9.9%] xl:mb-[-7.4%] mx-auto'>
            <Image className='top-20' src={"/images/globe.svg"} alt="globe" width={0} height={0} style={{ width: "100%", aspectRatio: "1.5/1" }} />
        </div>
    )
}
