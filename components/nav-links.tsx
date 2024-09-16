"use client"

import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Image from "next/image"

import { ChevronDown } from 'lucide-react'

const NavLinks = () => {

  const categories: string[] = ["Esik", "Kook", "Elutuba", "Kontor", "Magamistuba", "Lastetuba", "Vannituba", "Garaaz", "Saun", "Oues"]

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => {
    setIsDialogOpen(!isDialogOpen)
    scrollTo(0, 0)
  }

  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDialogOpen])


  return (
    <div className="w-full flex lg:gap-[10px]  xl:gap-[19px] items-center justify-center text-bg-foreground">
      <div className='p-[10px]'>
        <Link href={"/meist"}>
          <h1>Meist</h1>
        </Link>
      </div>
      <div className='p-[10px]'>
        <Link href={"/kuidas-see-tootab"}>
          <h1>Kuidas see tootab</h1>
        </Link>
      </div>
      <div onClick={openDialog} className="flex gap-[10px] p-[10px] cursor-pointer items-center">
        <h1>Moobel</h1>
        <div className={`transition-transform duration-300 ease-in-out ${isDialogOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown />
        </div>
      </div>

      <div className={`fixed top-[120px] left-0 w-full h-full z-50 bg-accent-foreground flex justify-center transition-all duration-300 ease-in-out transform ${isDialogOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="relative mt-[70px] px-[39px] pb-[143px] max-w-[937px] w-full max-h-[533px] h-full before:absolute before:inset-0 before:bg-cover before:bg-center before:bg-[url('/images/navbar-background.png')] before:mix-blend-overlay before:content-[''] ">
          <h1 className="text-xl pt-[46px] pb-[24px]">Koik kategooriad</h1>
          <div className='grid grid-cols-2 gap-y-[4px] gap-x-[300px]'>
            {categories.map((category) => (
              <Link key={category} href={"/" + category}>
                <h1 className='p-[10px] cursor-pointer text-lg leading-5'>{category}</h1>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { NavLinks }