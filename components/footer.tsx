import React from 'react'
import Image from 'next/image'
import { FooterMenu } from './footer-menu'
import { FooterMenuProps } from './footer-menu'
import { LanguageSelector } from './language-selector'
import { FooterBottom } from './footer-bottom'
import { MontserratAlternates } from '@/fonts'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const Footer = () => {

    const menu_1: FooterMenuProps = {
        title: "Rentimine",
        items: [
            {
                title: "Kuidas kasutada",
                url: "/kuidas-kasutada",
            },
            {
                title: "Vastutustundlik rentija",
                url: "/vastutustundlik-rentija"
            },
            {
                title: "Kindlustus soovitused",
                url: "/vastutustundlik-rentija"
            },
            {
                title: "Pildi tuunimine AI abiga",
                url: "/vastutustundlik-rentija"
            }
        ]
    } 

    const menu_2: FooterMenuProps = {
        title: "Tugi",
        items: [
            {
                title: "Abikeskus",
                url: "/abikeskus",
            },
            {
                title: "Tuhistamisvoimalus",
                url: "/tuhistamisvoimalus"
            },
            {
                title: "Teata probleemsest kasutajast",
                url: "/probleemne-kasutaja"
            },
            {
                title: "Hinnakiri",
                url: "/hinnakiri"
            }
        ]
    } 

  return (
    <footer className='w-full flex flex-col bg-secondary items-center'>
        <div className='flex flex-col h-[360px] justify-between px-[85px] w-full text-white max-w-[1440px]'>
            <div className='flex justify-between items-end pt-[64px]'>
                <div className='flex gap-[181px]'>
                    <div className='pt-[19px]'>
                    <FooterMenu {...menu_1}/>
                    </div>
                    <div className=''>
                    <FooterMenu {...menu_2}/>
                    </div>
                </div>
                <div className='w-[160px] h-[72px] items-center justify-center flex'>
                    <Link href={"/"}>
                        <Image alt='footer-logo' width={110} height={72} src={"/branding/logo-white.png"}/>
                    </Link>
                </div>
            </div>
            <div className='flex'>
                <FooterBottom />
            </div>
        </div>
    </footer>
  )
}

export { Footer }