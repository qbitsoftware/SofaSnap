"use client"

import React from 'react'
import { Text } from './_components/text'
import { Breadcrumb } from '@/components/breadcrumb'
import Image from 'next/image'
import { useTranslation } from '@/lib/i18n/i18n-provider'

const Page = () => {
    const { t } = useTranslation()

    return (
        <div className='flex flex-col justify-center  xl:max-w-[1440px] w-full px-[56px] pt-[30px] mx-auto'>
            <div className='mb-[38px]'>
                <Breadcrumb text={t('responsibleRenter.breadcrumb')} link='/' />
            </div>
            <div className='md:ml-[60px] lg:ml-[135px] mb-[179px]'>
                <div className='absolute -left-[10%] -right-[10%] top-0 bottom-0 w-[110%] h-full -z-10 overflow-hidden'>
                    <Image
                        src="/images/image.png"
                        fill
                        alt="Background texture"
                        className='object-cover '
                        priority
                    />
                </div>
                <Text />
            </div>
        </div>
    )
}

export default Page
