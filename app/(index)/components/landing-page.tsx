import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MontserratAlternates } from '@/fonts'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export const LandingPage = () => {
  return (
    <div className='w-full md:min-h-[810px]'>
        <div className='md:flex md:justify-between w-full'>
            <div className="md:ml-16 md:flex md:flex-col md:items-start mt-[83px]">
                <div className='md:relative max-h-[150px] h-[15vh]'>
                    <h1 className={cn('md:text-4xl lg:text-6xl md:w-[48vw] h-full font-semibold absolute z-10 text-start', MontserratAlternates.className)}>Rent furniture from<br className='lg:hidden'/>people in your<br className='lg:hidden'/> area</h1>
                </div>
                <Button className='bg-accent text-foreground rounded-2xl hover:bg-accent'>
                    Lisa oma tooted
                </Button>
            </div>
            <div className='relative md:max-w-[656px] md:w-[56vw] md:h-[34vh] md:min-h-[300px] md:max-h-[445px] md:flex'>
                    <Image className='absolute w-full h-full' objectFit='contain' src={"/images/landing.svg"} alt="furniture" fill/>
            </div>
        </div>
        <div className='md:w-[523px] md:ml-16 relative mt-[26px]'>
            <Search className='absolute left-5 top-2' color='white'/>
            <Button className='bg-[#f07162] absolute right-[6px] rounded-3xl h-8 top-1'>
                Search
            </Button>
            <Input className='md:w-[523px] bg-secondary rounded-3xl'/>
        </div>
    </div>
  )
}
