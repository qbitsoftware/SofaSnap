"use client"

import Link from 'next/link'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { ChevronDown } from 'lucide-react'
// import { FetchCategories } from '@/utils/supabase/queries/categories'
import { Category } from '@/utils/supabase/supabase.types'
import { capitalize } from '@/utils/utils'

interface NavLinksProps {
  categories: Category[] | undefined
}

const NavLinks: React.FC<NavLinksProps> = ({ categories }) => {

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const moobelButtonRef = useRef<HTMLDivElement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => {
    setIsDialogOpen(!isDialogOpen)
    scrollTo(0, 0)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dialogRef.current && !dialogRef.current.contains(target) &&
        moobelButtonRef.current && !moobelButtonRef.current.contains(target)
      ) {
        setIsDialogOpen(false);
      }
    };

    if (isDialogOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDialogOpen]);


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
      <div ref={moobelButtonRef} onClick={openDialog} className="flex gap-[10px] p-[10px] cursor-pointer items-center">
        <h1>Moobel</h1>
        <div className={`transition-transform duration-300 ease-in-out ${isDialogOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown />
        </div>
      </div>

      <div ref={dialogRef} className={`fixed top-[120px] left-0 w-full h-full z-50 bg-accent-foreground flex justify-center transition-all duration-300  ease-in-out transform ${isDialogOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="relative mt-[70px] px-[39px] pb-[143px] max-w-[937px] w-full max-h-[533px] h-full before:absolute before:inset-0 before:bg-cover before:bg-center before:bg-[url('/images/navbar-background.png')] before:mix-blend-overlay before:content-[''] ">
          <h1 className="text-xl pt-[46px] pb-[24px]">Koik kategooriad</h1>
          <div className='grid grid-cols-2 gap-y-[4px] gap-x-[300px]'>
            {
              categories && categories.map((category) => (
                <Link key={category.name_slug} href={"/" + category.name}>
                  <h1 className='p-[10px] cursor-pointer text-lg leading-5'>{capitalize(category.name)}</h1>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { NavLinks }