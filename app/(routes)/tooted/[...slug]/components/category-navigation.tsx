import { cn } from '@/lib/utils';
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
  product?: Product
  className: string
}

export const CategoryNavigation: React.FC<CategoryNavigationProps> = async ({ categories, product, className }) => {
  let currentPath = `/tooted`;
  return (
    <div className={cn('flex mt-[32px]',className)}>
      {categories.map((category, idx) => {
        currentPath += "/" + category.name_slug

        return (
          <div className='flex items-center' key={idx}>
            <Link className='font-sm text-md text-[#555555]' href={currentPath}>
              {capitalize(category.name)}
            </Link>
            {<ChevronRight strokeWidth={1} color='#555555' />}
            {product && idx == categories.length - 1 && <Link className='font-sm text-md text-[#555555]' href={`${currentPath}/${product.id}`}>{product.name}</Link>}
          </div>
        );
      })}
    </div>
  );
};