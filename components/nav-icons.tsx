import React from 'react'
import { Globe, CircleUser, MailOpen } from 'lucide-react'
import Link from 'next/link'

const NavIcons = () => {
    return (
        <div className="w-[132px] flex justify-center  gap-[19px] py-[6px]">
            <div className=''>
                <Link href={"/add-product"}>
                    <Globe width={31} height={31} />
                </Link>
            </div>
            <div className=''>
                <Link href={"/sign-in"}>
                    <CircleUser width={31} height={31} />
                </Link>
            </div>
            <div className=''>
                <Link href={"/globe"}>
                    <MailOpen width={31} height={31} />
                </Link>
            </div>
        </div>
    )
}

export { NavIcons }