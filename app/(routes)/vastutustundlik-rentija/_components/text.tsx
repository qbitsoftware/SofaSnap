"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'
import { useTranslation } from '@/lib/i18n/i18n-provider'

export const Text = () => {
    const { t } = useTranslation()

    return (
        <div className={cn('text-justify md:text-left w-full flex flex-col gap-5', poppins.className)}>
            <p className='md:w-[248px]'>{t('responsibleRenter.rules.1')}</p>
            <p className='md:w-[239px]'>{t('responsibleRenter.rules.2')}</p>
            <p className='md:w-[594px]'>{t('responsibleRenter.rules.3')}</p>
            <p className='md:w-[392px]'>{t('responsibleRenter.rules.4')}</p>
            <p className='md:w-[470px]'>{t('responsibleRenter.rules.5')}</p>
        </div>
    )
}

