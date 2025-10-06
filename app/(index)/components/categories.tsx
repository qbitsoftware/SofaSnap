"use client"
import { Button } from '@/components/ui/button';
import { CategoryCarousel } from './category-carousel'
import { Category } from '@/utils/supabase/supabase.types';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { MontserratAlternates } from '@/fonts';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/i18n/i18n-provider';

interface CategoryProps {
  data: Category[] | undefined
  error: string | undefined
}

export const Categories: React.FC<CategoryProps> = ({ data, error }) => {
  const { t } = useTranslation();
  const router = useRouter()
  const [showAll, setShowAll] = useState(false)

  if (!data || error) {
    return (
      <div className='relative md:h-[645px] bg-card w-full flex md:flex-col items-center justify-center'>
        <h1>
          {t('categories.noCategories')}
        </h1>
      </div>
    )
  }
  return (
    <div className='relative bg-card w-full'>
      <div className='hidden md:flex md:h-[445px] lg:h-[550px] md:flex-col items-center justify-center'>
        <div className='absolute top-10 max-w-[1356px] w-full left-1/2 -translate-x-1/2 flex justify-end'>
          {/* <MapButton className='md:mr-16 lg:mr-[4%] 2xl:mr-0 gap-4' /> */}
        </div>
        <h2 className='text-[44px] font-medium max-w-[1360px] mx-auto w-[80%] xl:w-[83%] 2xl:w-[80%] text-left'>{t('categories.title')}</h2>
        <CategoryCarousel Categories={data} className='py-12' />
      </div>

      <div className='md:hidden px-4 py-6'>
        <h2 className='text-2xl font-semibold mb-4'>{t('categories.title')}</h2>
        <div className='grid grid-cols-2 gap-3'>
          {data
            .filter(category => category.sub_categories?.length !== 0)
            .slice(0, showAll ? undefined : 4)
            .map((category, index) => (
              <div
                key={index}
                className='relative overflow-hidden rounded-lg shadow-md cursor-pointer'
                onClick={() => router.push(`/tooted/${category.name_slug}`)}
              >
                <div className='relative h-[140px] sm:h-[160px]'>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
                  <div className='absolute bottom-0 left-0 right-0 p-3'>
                    <h3 className={cn('text-sm sm:text-base font-semibold text-white line-clamp-2', MontserratAlternates.className)}>
                      {t(`navbar.slugs.${category.name_slug}`)}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {data.filter(category => category.sub_categories?.length !== 0).length > 4 && (
          <div className='mt-4 flex justify-center'>
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className='gap-2'
            >
              {showAll ? t('categories.showLess') : t('categories.showMore')}
              <ChevronDown className={cn('h-4 w-4 transition-transform', showAll && 'rotate-180')} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
