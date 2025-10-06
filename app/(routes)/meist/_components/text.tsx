"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'
import { useTranslation } from '@/lib/i18n/i18n-provider'

export const Text = () => {
  const { t } = useTranslation()

  return (
    <div className={cn('text-justify md:text-left', poppins.className)}>
      <p className='mb-[54px] md:w-[540px] lg:w-[708px]'>
        {t('about.paragraph1')}
      </p>
      <p className='mb-[63px] md:w-[540px] md:ml-[109px] lg:w-[708px]'>
        {t('about.paragraph2')}
      </p>
      <p className='md:w-[540px] lg:w-[738px]'>
        {t('about.paragraph3')}
      </p>
    </div>
  )
}

