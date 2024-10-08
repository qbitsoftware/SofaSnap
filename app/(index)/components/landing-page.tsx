import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MontserratAlternates } from '@/fonts'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { SearchButton } from './search-button'
import Link from 'next/link'

export const LandingPage = () => {
    return (
        <div className='w-full md:min-h-[470px] lg:min-h-[650px] xl:min-h-[810px] max-w-[1440px] mx-auto mb-[30px]'>
            <div className='flex flex-col md:flex-row md:justify-between w-full'>
                <div className="md:ml-16 flex md:flex flex-col md:items-start mt-[20px] md:mt-[83px]">
                    <div className='md:relative md:h-[150px] lg:h-[250px]'>
                        <h1 className={cn('hidden md:block md:text-4xl lg:text-6xl md:w-[48vw] md:max-w-[553px] h-full font-semibold absolute z-10 text-start', MontserratAlternates.className)}>Rent furniture from <br className='lg:hidden' />people in your<br className='lg:hidden' /> area</h1>
                        <h1 className={cn('md:hidden text-center text-2xl sm:text-4xl font-semibold', MontserratAlternates.className)}>Anna mööblile uus elu -<br></br>teenid sina, võidab loodus!</h1>
                    </div>
                    <Link className='mx-auto z-10' href={"/lisa-toode"} >
                        <Button className='md:bg-accent text-[#F07162] bg-transparent md:text-foreground hover:bg-transparent rounded-3xl md:hover:bg-accent md:w-[180px] md:h-[60px] mt-5 md:mt-0 underline md:no-underline'>
                            Lisa oma toode
                        </Button>
                    </Link>
                </div>
                <div className='hidden relative aspect-[1.47/1]  md:w-[48vw] lg:w-[54vw] xl:w-[60vw] xl:mr-20 md:flex justify-self-end max-w-[821px]'>
                    <Image className='absolute w-full h-full' src={"/images/landing.png"} alt="furniture" fill sizes='(max-width: 1024) 48vw, (max-width: 1280px) 54vw, 60vw' priority />
                </div>
                <div className='relative md:hidden aspect-[375/189] mt-[-60px]'>
                    <Image className='absolute' src={"/images/Käed.svg"} alt="kaed" fill />
                </div>
            </div>
            <div className='md:block hidden md:w-[523px] md:ml-16 relative mt-[26px]'>
                <Search className='absolute left-5 xl:top-[20px] top-[14px]' color='white' />
                <SearchButton />
                <Input className='md:w-[523px] bg-secondary rounded-full md:h-[53px] xl:h-[65px] text-background px-[60px] text-xl' />
            </div>
        </div>
    )
}
