import  Image from "next/image"
import React from 'react'
import { Button } from "./ui/button"
import { NavLinks } from "./nav-links"
import { NavIcons } from "./nav-icons"
import Link from 'next/link'


const NavBar = () => {
  return (
    <div  className="flex w-full lg:max-w-[1152px] xl:max-w-[1310px] h-[50px] my-[35px] items-center justify-between mx-auto">
        <div className="cursor-pointer xl:w-[545px]">
            <Link href={"/"}>
                <Image alt="logo" src={"/branding/logo-black.png"} width={211} height={50}/>
            </Link>
        </div>
        <div className="flex gap-[51px] items-center">

        <div className="flex lg:w-[706px] xl:w-[530px] items-center py-[4px] justify-between">

            <div className="">
                <NavLinks />
            </div>
            <div className="">
                <Button className="rounded-full bg-accent text-bg-foreground lg:py-[11px] lg:px-[18px] xl:p-[11px] shadow-xl">
                    Log in or Sign up
                </Button>
            </div>
        </div>
        <div className="xl:w-[132px]">
            <NavIcons />
        </div>
        </div>
    </div>
  )
}

export { NavBar }