import { createClient } from '@/utils/supabase/server';
import { CategoryCarousel } from './category-carousel'

export const Categories = async () => {

    const supabase = createClient()

    const { data: categories, error } = await supabase.from('categories').select('*');

    console.log('Categories:', categories);
    console.log('Error:', error);
    

  return (
    <div className='relative md:h-[645px] bg-card w-full flex md:flex-col justify-center items-center'>
        <h2 className='absolute w-full md:left-[10%] md:top-[116px] md:text-5xl font-medium max-w-[1440px] 2xl:left-[18%]'>Kategooriad</h2>
        <CategoryCarousel Categories={categories}/>
    </div>
  )
}
