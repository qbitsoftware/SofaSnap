import { cn } from '@/lib/utils';
import { FetchCategories } from '@/utils/supabase/queries/categories';
import { product } from '@/utils/supabase/schema';
import { Product } from '@/utils/supabase/supabase.types';
import { capitalize } from '@/utils/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface CategoryNavigationProps {
  categories: {
    name: string;
    name_slug: string;
  }[];
  product?: Product // Make sure product is a string or undefined
  className: string
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = async ({ categories, product, className }) => {
  return (
    <div className={cn('flex mt-[32px]',className)}>
      {categories.map((category, idx) => {
        // Construct the path for each category separately
        let currentPath = `/tooted/${category.name_slug}`;
        
        // Append product to the path if it exists and is a string

        return (
          <div className='flex items-center' key={idx}>
            <Link className='font-sm text-md text-[#555555]' href={currentPath}>
              {capitalize(category.name)}
            </Link>
            {<ChevronRight color='#555555' />}
            {product && idx == categories.length - 1 && <Link className='font-sm text-md text-[#555555]' href={`${currentPath}/${product.id}`}>{product.name}</Link>}
          </div>
        );
      })}
    </div>
  );
};