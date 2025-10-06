"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { useTranslation } from '@/lib/i18n/i18n-provider'

export const SearchButton = () => {
    const { t } = useTranslation();
    const onInput = () => {
    }
    return (
        <Button
            onClick={() => onInput()}
            className='bg-accent absolute right-[6px] rounded-3xl xl:rounded-full w-[123px] md:h-[43px] top-[5px] xl:h-[55px] hover:bg-[#f07162]'
        >
            {t('common.search')}
        </Button>
    )
}
