import Image from 'next/image'
import React from 'react'

export const Globe = () => {
    return (
        <div className='flex items-center justify-center w-full mb-[-6.1%]'>
            <Image className='top-20' src={"/images/globe.svg"} alt="globe" width={0} height={0} style={{ width: "50%", aspectRatio: "1.5/1" }} />
        </div>
    )
}
