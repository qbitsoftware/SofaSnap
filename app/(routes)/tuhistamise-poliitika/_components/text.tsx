"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'
import { useTranslation } from '@/lib/i18n/i18n-provider'

export const Text = () => {
    const { t } = useTranslation()

    return (
        <div className={cn('text-justify md:text-left lg:w-[850px] xl:w-[1055px]', poppins.className)}>
            <p className='mb-[10px] md:w-[540px] lg:w-full'>
                <strong>{t('cancellationPolicy.owners.title')} </strong> {t('cancellationPolicy.owners.content')}
            </p>
            <p className='mb-[43px] md:w-[540px] lg:w-full'>
                <strong>{t('cancellationPolicy.renters.title')} </strong> {t('cancellationPolicy.renters.content')}
            </p>
            <ul className='mb-[34px]'>
                <li>{t('cancellationPolicy.conditions.1')} </li>
                <li>{t('cancellationPolicy.conditions.2')}</li>
                <li>{t('cancellationPolicy.conditions.3')} </li>
            </ul>
            <p><strong>{t('cancellationPolicy.example.title')}</strong></p>
            <p>{t('cancellationPolicy.example.content')}</p>
        </div>
    )
}

