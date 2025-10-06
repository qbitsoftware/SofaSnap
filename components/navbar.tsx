import Image from "next/image"
import React from 'react'
import { Button } from "./ui/button"
import { NavLinks } from "./nav-links"
import { NavIcons } from "./nav-icons"
import Link from 'next/link'
import { CircleUser } from 'lucide-react';
import { MobileNav } from "./mobile-nav"
import { LogOut } from "./logout"
import { FetchCategories } from "@/utils/supabase/queries/categories"
import { GetUserInfo } from "@/app/actions"
import Profile from "./nav-bar-profile"
import { TSignUpSchema } from "@/lib/register-validation"
import { getFavoriteProducts } from "@/utils/supabase/queries/favorite"
import { LanguageSwitcher } from "./language-switcher"

const NavBar = async () => {

    const user = await GetUserInfo()
    const cateogries = await FetchCategories()
    const favorites = await getFavoriteProducts(user.data?.user?.id || "")

    const userInfo = user.data?.user?.user_metadata as TSignUpSchema

    return (
        <div className="flex px-6 md:px-[64px] w-full max-w-[1440px] h-[68px] md:h-[50px] mt-[14px] mb-[35px] md:my-[35px] items-center justify-between mx-auto">
            <div className="md:hidden">
                <MobileNav categories={cateogries.data} />
            </div>
            <div className="cursor-pointer w-[68px] h-auto md:w-[200px] lg:min-w-[250px] xl:w-[545px] flex items-center">
                <Link href={"/"}>
                    <Image alt="logo" className="md:hidden" src={"/branding/logo-black-small.svg"} width={68} height={58} />
                    <Image alt="logo" className="hidden md:inline" src={"/branding/logo-black.svg"} style={{ height: "auto" }} width={211} height={65} />
                </Link>
            </div>
            <div className="flex md:gap-[5px] lg:gap-[21px] items-center">
                                <div className="hidden md:flex lg:w-[540px] xl:w-[530px] items-center py-[4px] justify-between">
                    <div className="md:gap-[50px]">
                        <NavLinks categories={cateogries.data} />
                    </div>
                    <div className="hidden lg:inline">
                        {user.data.user ? (
                            <LogOut />
                        ) :
                            <div>
                                <Link href={"/login"}>
                                    <Button className="rounded-full bg-accent text-bg-foreground px-[25px] lg:py-[11px] lg:px-[25px] xl:p-[11px] xl:px-[40px] shadow-xl">
                                    Logi sisse
                                    </Button>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
               
                <div className="xl:w-[132px] hidden md:inline">
                    <NavIcons user={userInfo} favorites={favorites?.length || 0} />
                </div>
                 <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />
                </div>

                <div className="md:hidden flex items-center gap-2">
                    {user.data.user ? (
                        <div className="">

                            <Profile user={userInfo} />
                        </div>
                    ) :
                        <div>
                            <Link href={"/login"}>
                                <CircleUser className="h-[32px] w-[32px] cursor-pointer hover:scale-105" />
                            </Link>

                        </div>
                    }
                </div>
            </div>

        </div>
    )
};

export default NavBar;
