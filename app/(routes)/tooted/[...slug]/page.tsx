"use server"

import React from 'react'
import ProductPage from './components/product-page'
import { CategoryNavigation } from './components/category-navigation'
import { ChevronLeft } from 'lucide-react'
import { MapButton } from '@/components/map-button'
import { capitalize } from '@/utils/utils'
import { Filter } from './components/filter'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Products } from './components/products'
import { fetchProductsByCategories } from '@/utils/supabase/queries/products'
// import { CheckCategories } from '@/utils/supabase/queries/categories'
import { redirect, useRouter } from 'next/navigation'
import { CheckCategories, FetchCategories } from '@/utils/supabase/queries/categories'

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}) => {

  let page = 1
  if (searchParams && searchParams.page) {
    page = Number(searchParams.page)
  }

  const categories = params.slug.slice(0, params.slug.length);
  const isProductPage = Number(params.slug[params.slug.length - 1]);
  const {data, error:category_error} = await FetchCategories()

  if (category_error || !data) {
    redirect("/404")
  }

  let category_objects = categories.map((c) => {
    const matchedCategory = data?.find((category) => category.name_slug === c);
    
    if (matchedCategory) {
      return {
        name: matchedCategory.name,
        name_slug: matchedCategory.name_slug
      };
    }
  
    return {
      name: "",
      name_slug: ""
    }
  });
  

  if (isProductPage && params.slug.length > 1) {
    return (
      <ProductPage product_id={Number(params.slug[params.slug.length - 1])} slugs={params.slug} categories={category_objects}/>
    )
  } else {
    
    const {isValid, error} = await CheckCategories(categories)
    if (error && !isValid) {
      redirect('/404')
    } 
    
    
    const {success, products, totalPages, message} = await fetchProductsByCategories(categories, page)

    if (!success) {
      return
     // todo: motle mingi error lahendus valja 
    }

    return (
      <div className='md:mx-auto md:px-[64px] max-w-[1440px]'>
        <CategoryNavigation categories={category_objects} />
        <div className='md:mt-16 md:flex md:items-center md:justify-between'>
          <ChevronLeft color='#555555' size={44} />
          <h2 className='md:text-5xl'>{capitalize(category_objects[category_objects.length - 1].name)}</h2>
          <MapButton className='' />
        </div>
        <div className='md:px-10 md:mt-12'>
          <Filter />
          <div className='mt-10 '>
            <Products products={products} />
          </div>
          <div className='my-[100px]'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  {page > 1 && (
                    <PaginationPrevious className='hover:text-white' href={`?page=${page - 1}`} />
                  )}
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href={`?page=${p}`}
                      isActive={p === page}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalPages > 5 && page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  {page < totalPages && (
                    <PaginationNext className='hover:text-white' href={`?page=${page + 1}`} />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    )
  }
}
export default CategoryPage