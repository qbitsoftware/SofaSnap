import React from 'react'
import Link from "next/link"
import { MontserratAlternates } from '@/fonts'
import { cn } from '@/lib/utils'

export interface MenuItem {
    title: string
    url: string
}

export interface FooterMenuProps {
    title: string
    items: MenuItem[]
}

const FooterMenu:React.FC<FooterMenuProps> = ({title, items}) => {
  return (
    <div className={cn('flex flex-col', MontserratAlternates.className)}>
        <h1 className='font-bold p-[10px]'>{title}</h1>
        <div className='flex flex-col gap-[1px]'>
            {items.map((item) => (
                <Link key={item.title} href={item.url}>
                    <h2 className='p-[10px]'>{item.title}</h2>
                </Link>
            ))}
        </div>
    </div>
  )
}

export { FooterMenu }