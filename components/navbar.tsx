import Image from "next/image"
import React from 'react'
import { Button } from "./ui/button"
import { NavLinks } from "./nav-links"
import { NavIcons } from "./nav-icons"
import Link from 'next/link'
import { CircleUser, Menu } from 'lucide-react';
import { MobileNav } from "./mobile-nav"


const NavBar = () => {


    return (
        <div className="flex w-full lg:max-w-[1152px] xl:max-w-[1310px] h-[68px] md:h-[50px] mt-[14px] mb-[35px] md:my-[35px] items-center justify-between mx-auto">
            <div className="md:hidden">
                <MobileNav />
            </div>
            <div className="cursor-pointer w-[68px] h-[68px] md:w-[200px] lg:min-w-[250px] xl:w-[545px] flex items-center">
                <Link href={"/"}>
                    <Image alt="logo" className="md:hidden" src={"/branding/logo-black-small.svg"} width={68} height={68} />
                    <Image alt="logo" className="hidden md:inline" src={"/branding/logo-black.png"} width={211} height={50} />
                </Link>
            </div>
            <div className="flex gap-[21px] items-center">

                <div className="hidden md:flex lg:w-[540px] xl:w-[530px] items-center py-[4px] justify-between">

                    <div className="md:gap-[50px]">
                        <NavLinks />
                    </div>
                    <div className="">
                        <Link href={"/sign-in"}>
                            <Button className="rounded-full bg-accent text-bg-foreground px-[25px] lg:py-[11px] lg:px-[25px] xl:p-[11px] xl:px-[40px] shadow-xl">
                                Log in
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="xl:w-[132px] hidden lg:inline">
                    <NavIcons />
                </div>
                <div className="md:hidden">
                    <Link href={"/sign-in"}>
                        <CircleUser width={32} height={32} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export { NavBar }