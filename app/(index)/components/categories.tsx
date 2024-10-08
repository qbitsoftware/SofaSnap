"use client"
import { Button } from '@/components/ui/button';
import { CategoryCarousel } from './category-carousel'
import { MapButton } from '@/components/map-button';
import { Category } from '@/utils/supabase/supabase.types';
import { capitalize } from '@/utils/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/utils/cn';
import { MontserratAlternates } from '@/fonts';
import { useRouter } from 'next/navigation';

interface CategoryProps {
  data: Category[] | undefined
  error: string | undefined
}

export const Categories: React.FC<CategoryProps> = ({ data, error }) => {
  const router = useRouter()
  const [showTopButton, setShowTopButton] = useState(false)
  const [showBottomButton, setShowBottomButton] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
        setShowTopButton(scrollTop > 0)
        setShowBottomButton(scrollTop + clientHeight < scrollHeight)
      }
    }

    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scrollTo = (direction: 'up' | 'down') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'up' ? -200 : 200
      scrollContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' })
    }
  }

  if (!data || error) {
    return (
      <div className='relative md:h-[645px] bg-card w-full flex md:flex-col items-center justify-center'>
        <h1>
          No Categories Found
        </h1>
      </div>
    )
  }
  return (
    <div className='relative bg-card w-full'>
      <div className='hidden md:flex md:h-[645px] md:flex-col items-center justify-center'>
        <div className='absolute top-10 max-w-[1356px] w-full left-1/2 -translate-x-1/2 flex justify-end'>
          <MapButton className='md:mr-16 lg:mr-[4%] 2xl:mr-0 gap-4' />
        </div>
        <h2 className='md:text-5xl font-medium max-w-[1360px] mx-auto w-[80%] xl:w-[83%] 2xl:w-[80%] text-left'>Kategooriad</h2>
        <CategoryCarousel Categories={data} className='py-12' />
      </div>

      <div className='md:hidden'>
        <div className='relative'>
          {showTopButton && (
            <Button
              className='absolute top-0 left-1/2 -translate-x-1/2 z-10'
              onClick={() => scrollTo('up')}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}
          <div
            ref={scrollContainerRef}
            className='max-h-[calc(100vh-200px)] overflow-y-auto'>
            {data.map((category, index) => (
              <div
                key={category.id}
                className='relative w-full'
                onClick={() => router.push(`/tooted/${category.name_slug}`)}
              >
                <div className='relative h-[200px]'>
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout='fill'
                    objectFit='cover'
                  />
                  <div className='absolute inset-0 flex items-end justify-center'>
                    <div className='bg-white bg-opacity-30 backdrop-blur-lg w-full py-[20px] pl-[25px]'>
                      <h3 className={cn('text-xl font-semibold', MontserratAlternates.className)} >{capitalize(category.name)}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showBottomButton && (
            <Button
              className='absolute bottom-0 left-1/2 -translate-x-1/2 z-10'
              onClick={() => scrollTo('down')}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
