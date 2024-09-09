import React from 'react'
import { Mission } from './components/breadcrumb'
import { Text } from './components/text'
import Image from 'next/image'

const Page = () => {
  return (
    <div className='flex flex-col justify-center xl:max-w-[1440px] w-full px-[56px] pt-[30px] mx-auto'>
        <div className='mb-[38px]'>
            <Mission />
        </div>
        <div className='ml-[135px] mb-[179px]'>
            <Text />
        </div>

        <div className='w-[326px] h-[130px] mb-[200px] mx-auto'>
            <Image alt='logo' width={326} height={130} src={"/branding/logo-meist.svg"}/>
        </div>
    </div>
  )
}

export default Page