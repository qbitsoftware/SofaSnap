import { createClient } from '@/utils/supabase/server';
import { CategoryCarousel } from './category-carousel'
import { Button } from '@/components/ui/button';
import { Map } from 'lucide-react';

export const Categories = async () => {

  // todo handle errors

  const supabase = createClient()

  const { data: categories, error } = await supabase.from('categories').select('*');

  if (!categories || error) {
    console.log('Categories:', categories);
    console.log('Error:', error);
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
        <Button className='md:w-[190px] md:h-[60px] flex gap-4 rounded-full bg-secondary md:mr-16 lg:mr-[4%] 2xl:mr-0'>
          Kuva Kaardil <span ><Map /></span>
        </Button>
      </div>
      <h2 className='md:text-5xl font-medium max-w-[1360px] mx-auto w-[80%] xl:w-[83%] 2xl:w-[80%] text-left'>Kategooriad</h2>
      <CategoryCarousel Categories={categories} className='py-12' />
    </div>
  )
}

