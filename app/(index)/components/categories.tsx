
import { CategoryCarousel } from './category-carousel'
import { MapButton } from '@/components/map-button';
import { FetchCategories } from '@/utils/supabase/queries/categories';
import { Category } from '@/utils/supabase/supabase.types';

interface CategoryProps {
  data: Category[] | undefined
  error: string | undefined
}

export const Categories:React.FC<CategoryProps> = ({data, error}) => {

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
    <div className='relative md:h-[645px] bg-card w-full flex md:flex-col items-center justify-center'>
      <div className='absolute top-10 max-w-[1356px] w-full left-1/2 -translate-x-1/2 flex justify-end'>
        <MapButton className='md:mr-16 lg:mr-[4%] 2xl:mr-0 gap-4' />
      </div>
      <h2 className='md:text-5xl font-medium max-w-[1360px] mx-auto w-[80%] xl:w-[83%] 2xl:w-[80%] text-left'>Kategooriad</h2>
      <CategoryCarousel Categories={data} className='py-12' />
    </div>
  )
}

