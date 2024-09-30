import Image from "next/image"
import React from 'react'
import { Button } from "./ui/button"
import { NavLinks } from "./nav-links"
import { NavIcons } from "./nav-icons"
import Link from 'next/link'
import { CircleUser } from 'lucide-react';
import { MobileNav } from "./mobile-nav"
// import { GetUserInfo } from "@/app/actions"
import { LogOut } from "./logout"
import { FetchCategories, fetchCategories } from "@/utils/supabase/queries/categories"
import { ServerError } from "./server-error"
import { createClient } from "@/utils/supabase/server"
import { Category } from "@/utils/supabase/supabase.types"
import { GetUserInfo } from "@/app/actions"

interface NavBarProps {
    categories: Category[]
}


const NavBar:React.FC<NavBarProps> = async ({categories}) => {
  
    const user = await GetUserInfo()
  
  
    return (
      <div className="flex w-full lg:max-w-[1152px] xl:max-w-[1310px] h-[68px] md:h-[50px] mt-[14px] mb-[35px] md:my-[35px] items-center justify-between mx-auto px-[24px]">
        {/* Logo and links */}
        <Link href={"/"}>
          <Image
            alt="logo"
            className="md:hidden"
            src={"/branding/logo-black-small.svg"}
            width={68}
            height={68}
          />
          <Image
            alt="logo"
            className="hidden md:inline"
            src={"/branding/logo-black.png"}
            width={211}
            height={50}
          />
        </Link>
        <div className="flex gap-[21px] items-center">
          {/* Nav links */}
          <NavLinks categories={categories} />
          {/* User login/logout */}
          {user?.data?.user ? (
            <LogOut />
          ) : (
            <Link href={"/sign-in"}>
              <Button className="rounded-full bg-accent text-bg-foreground px-[25px] lg:py-[11px] lg:px-[25px] xl:p-[11px] xl:px-[40px] shadow-xl">
                Log in
              </Button>
            </Link>
          )}
          <NavIcons />
        </div>
      </div>
    );
  };
  
  export default NavBar;
  