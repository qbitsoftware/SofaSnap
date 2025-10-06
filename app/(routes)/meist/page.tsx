"use client"

import React from 'react'
import { Text } from './_components/text'
import Image from 'next/image'
import { Breadcrumb } from '@/components/breadcrumb'
import { useTranslation } from '@/lib/i18n/i18n-provider'

const Page = () => {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col justify-center  xl:max-w-[1440px] w-full px-[56px] pt-[30px] mx-auto'>
      <div className='mb-[38px]'>
        <Breadcrumb text={t('about.breadcrumb')} link='/' />
      </div>
      <div className='md:ml-[60px] lg:ml-[135px] mb-[179px]'>
        <Text />
      </div>

      <div className='w-[240px] md:w-[280px] lg:w-[326px] h-auto mb-[100px] md:mb-[160px] lg:mb-[200px] mx-auto'>
        <Image alt={t('about.logoAlt')} width={326} height={159} src={"/branding/logo-meist-uus.svg"} />
      </div>
    </div>
  )
}

export default Page