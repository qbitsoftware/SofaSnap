import React from 'react'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'


const Mission = () => {
  return (
    <div className='flex max-w-[1440px] w-full items-center'>
      <div className='flex pr-[40px] md:pr-[45px] lg:pr-[85px] items-center'>
        <Link className='cursor-pointer' href={"/"}>
          <ChevronLeft width={50} height={50} />
        </Link>
      </div>
      <div>
        <h2 className='font-medium text-[36px] md:text-[44px]'>Mission</h2>
      </div>
    </div>
  )
}

export { Mission }