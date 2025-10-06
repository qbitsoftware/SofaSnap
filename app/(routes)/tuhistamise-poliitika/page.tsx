"use client"

import React from 'react'
import { Text } from './_components/text'
import { Breadcrumb } from '@/components/breadcrumb'
import { useTranslation } from '@/lib/i18n/i18n-provider'

const Page = () => {
    const { t } = useTranslation()

    return (
        <div className='flex flex-col justify-center  xl:max-w-[1440px] w-full px-[56px] pt-[30px] mx-auto'>
            <div className='mb-[38px]'>
                <Breadcrumb text={t('cancellationPolicy.breadcrumb')} link='/' />
            </div>
            <div className='md:ml-[60px] lg:ml-[135px] mb-[179px]'>
                <Text />
            </div>
        </div>
    )
}

export default Page