"use client"

import { useTranslation } from '@/lib/i18n/i18n-provider'

export function Text() {
    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg">{t('contact.companyInfo.companyName')}</h1>
            <p className=""><span className="pr-8">{t('contact.companyInfo.address')}</span> <span className="">{t('contact.companyInfo.addressValue')}</span></p>
            <p><span className="pr-6">{t('contact.companyInfo.regCode')}</span> <span>{t('contact.companyInfo.regCodeValue')}</span></p>
            <p><span className="pr-8">{t('contact.companyInfo.contact')}</span> <span>{t('contact.companyInfo.contactValue')}</span></p>
            <p><span className="pr-12">{t('contact.companyInfo.email')}</span> <span>{t('contact.companyInfo.emailValue')}</span></p>
        </div>
    )
}