"use client"

import React from 'react'
import Image from 'next/image'
import { FooterMenu } from './footer-menu'
import { FooterMenuProps } from './footer-menu'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/i18n-provider'

const Footer = () => {
    const { t } = useTranslation()

    const menu_1: FooterMenuProps = {
        title: t('footer.menu1.title'),
        items: [
            {
                title: t('footer.menu1.items.howToUse'),
                url: "/kuidas-see-tootab",
            },
            {
                title: t('footer.menu1.items.responsibleRenter'),
                url: "/vastutustundlik-rentija"
            },
            {
                title: t('footer.menu1.items.termsOfSale'),
                url: "/muugitingimused"
            },
            {
                title: t('footer.menu1.items.privacyPolicy'),
                url: "/privaatsuspoliitika"
            }
        ]
    }

    const menu_2: FooterMenuProps = {
        title: t('footer.menu2.title'),
        items: [
            {
                title: t('footer.menu2.items.contact'),
                url: "/kontaktid",
            },
            {
                title: t('footer.menu2.items.cancellationPolicy'),
                url: "/tuhistamise-poliitika"
            },
            {
                title: t('footer.menu2.items.reportUser'),
                url: "/probleemne-kasutaja"
            },
            {
                title: t('footer.menu2.items.faq'),
                url: "/kkk"
            }
        ]
    }

    return (
        <footer className='w-full flex flex-col bg-secondary items-center '>
            <div className='flex flex-col items-center md:items-stretch  md:h-[360px] justify-center  md:justify-between md:px-[50px] lg:px-[85px] w-full text-white max-w-[1440px]'>
                <div className='flex justify-center md:justify-between items-end pt-[64px]'>
                    <div className='flex gap-[60px] flex-col text-center md:text-left md:flex-row lg:gap-[181px]'>
                        <div className=''>
                            <FooterMenu {...menu_1} />
                        </div>
                        <div className=''>
                            <FooterMenu {...menu_2} />
                        </div>
                    </div>
                    <div className='hidden md:flex  items-center justify-center'>
                        <Link href={"/"}>
                            <Image alt={t('footer.logoAlt')} width={110} height={107} src={"/branding/logo-white.svg"} />
                        </Link>
                    </div>
                </div>
                <div className='flex items-center justify-center md:hidden py-[35px] pb-[45px]'>
                    <Link href={"/"}>
                        <Image alt={t('footer.logoAlt')} width={110} height={107} src={"/branding/logo-white.svg"} />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export { Footer }
