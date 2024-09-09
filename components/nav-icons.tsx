import React from 'react'
import { Globe, CircleUser, MailOpen} from 'lucide-react'
import Link from 'next/link'

const NavIcons = () => {
  return (
    <div className="w-[132px] flex gap-[19px] py-[6px]">
        <div>
            <Link href={"/globe"}>
                <Globe width={31} height={31}/>
            </Link>
        </div>
        <div>
            <Link href={"/globe"}>
                <CircleUser width={31} height={31}/>
            </Link>
        </div>
        <div>
            <Link href={"/globe"}>
                <MailOpen width={31} height={31}/>
            </Link>
        </div>
    </div>
  )
}

export { NavIcons }