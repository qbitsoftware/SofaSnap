import { capitalize } from '@/utils/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CategoryNavigationProps {
  categories: string[];
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ categories }) => {
  let path = ''; 

  return (
    <div className='flex mt-[32px]'>
      {
        categories.map((category, idx) => {
          path += `/${category}`;

          return (
            <div className='flex items-center' key={idx}>
              <Link className='font-sm text-md text-[#555555]' href={`/tooted${path}`} >
                {capitalize(category)}
              </Link>
              {<ChevronRight color='#555555'/>}
            </div>
          );
        })
      }
    </div>
  );
};
