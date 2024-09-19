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
import fetchProducts from '@/utils/supabase/queries/products'
import { CheckCategories } from '@/utils/supabase/queries/categories'
import { redirect, useRouter } from 'next/navigation'

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

  if (isProductPage && params.slug.length > 1) {
    return (
      <ProductPage product_id={Number(params.slug[params.slug.length - 1])} />
    )
  } else {

    const {isValid, error} = await CheckCategories(categories)
    console.log(isValid, error)
    if (error && !isValid) {
      redirect('/404')
    } 
    
    const {success, products, totalPages, message} = await fetchProducts(categories, page)

    if (!success) {
      return
     // todo: motle mingi error lahendus valja 
    }

    return (
      <div className='md:mx-auto md:px-[64px] max-w-[1440px]'>
        <CategoryNavigation categories={params.slug} />
        <div className='md:mt-16 md:flex md:items-center md:justify-between'>
          <ChevronLeft color='#555555' size={44} />
          <h2 className='md:text-5xl'>{capitalize(params.slug[params.slug.length - 1])}</h2>
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