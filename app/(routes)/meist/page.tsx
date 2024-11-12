import React from 'react'
import { Text } from './components/text'
import Image from 'next/image'
import { Breadcrumb } from '@/components/breadcrumb'

const Page = () => {
  return (
    <div className='flex flex-col justify-center  xl:max-w-[1440px] w-full px-[56px] pt-[30px] mx-auto'>
      <div className='mb-[38px]'>
        <Breadcrumb text='Missioon' link='/' />
      </div>
      <div className='md:ml-[60px] lg:ml-[135px] mb-[179px]'>
        <Text />
      </div>

      <div className='w-[240px] md:w-[280px] lg:w-[326px] h-[130px] mb-[100px] md:mb-[160px] lg:mb-[200px] mx-auto'>
        <Image alt='logo' width={326} height={130} src={"/branding/logo-meist-uus.svg"} />
      </div>
    </div>
  )
}

export default Page