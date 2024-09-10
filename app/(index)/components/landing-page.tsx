import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MontserratAlternates } from '@/fonts'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { SearchButton } from './search-button'

export const LandingPage = () => {
    return (
        <div className='w-full md:min-h-[510px] lg:min-h-[810px] max-w-[1440px] mx-auto'>
            <div className='md:flex md:justify-between w-full'>
                <div className="md:ml-16 md:flex md:flex-col md:items-start mt-[83px]">
                    <div className='md:relative md:h-[150px] lg:h-[250px]'>
                        <h1 className={cn('md:text-4xl lg:text-6xl md:w-[48vw] md:max-w-[553px] h-full font-semibold absolute z-10 text-start', MontserratAlternates.className)}>Rent furniture from <br className='lg:hidden' />people in your<br className='lg:hidden' /> area</h1>
                    </div>
                    <Button className='bg-accent text-foreground rounded-3xl hover:bg-accent w-[180px] h-[60px]'>
                        Lisa oma tooted
                    </Button>
                </div>
                <div className='relative aspect-[1.47/1] md:w-[48vw] lg:w-[54vw] xl:w-[60vw] xl:mr-20 md:flex justify-self-end max-w-[821px]'>
                    <Image  className='absolute w-full h-full' objectFit='contain' src={"/images/landing.png"} alt="furniture" fill priority />
                </div>
            </div>
            <div className='md:w-[523px] md:ml-16 relative mt-[26px]'>
                <Search className='absolute left-5 xl:top-[20px] top-[14px]' color='white' />
                <SearchButton />
                <Input className='md:w-[523px] bg-secondary rounded-full md:h-[53px] xl:h-[65px] text-background px-[60px] text-xl' />
            </div>
        </div>
    )
}
