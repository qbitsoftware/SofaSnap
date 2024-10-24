import React from 'react'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'


const EditProduct = () => {
    return (
        <div className='flex max-w-[1440px] w-full items-center'>
            <div className='flex flex-col md:flex-row  md:gap-[85px] md:items-center '>
                <div className='cursor-pointer w-[35px] h-[35px] md:w-[50px] md:h-[50px] mb-[10px] md:mb-[0px]'>
                    <Link href={"/kuulutused"}>
                        <ChevronLeft className='w-[35px] h-[35px] md:w-[50px] md:h-[50px]' />
                    </Link>
                </div>
                <h2 className='font-medium text-lg md:text-[44px]'>Muuda toodet</h2>
            </div>
        </div>
    )
}

export { EditProduct }