import React from 'react'
import ProductPage from './components/product-page'
import { CategoryNavigation } from './components/category-navigation'
import {ChevronLeft } from 'lucide-react'
import { MapButton } from '@/components/map-button'
import { capitalize } from '@/utils/utils'
import { ProductList } from './components/product-list'
import { FetchProductsByCategories } from '@/app/actions'
import { redirect } from 'next/navigation'
import { CheckCategories, FetchCategories } from '@/utils/supabase/queries/categories'
import Link from 'next/link'
import { SortDropdown } from './components/sort-dropdown'

const PRODUCTS_PER_PAGE = 30

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string[] }
  searchParams: { [key: string]: string | string[] | undefined, sort?: string }
}) => {

  let page = 1
  if (searchParams && searchParams.page) {
    page = Number(searchParams.page)
  }

  const categories = params.slug.slice(0, params.slug.length);
  const isProductPage = Number(params.slug[params.slug.length - 1]);
  const { data, error: category_error } = await FetchCategories()

  if (category_error || !data) {
    redirect("/404")
  }

  const category_objects = categories.map((c) => {
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


  if (isProductPage && params.slug.length >= 1) {
    return (
      <ProductPage product_id={Number(params.slug[params.slug.length - 1])} slugs={params.slug} categories={category_objects} />
    )
  } else {

    const { isValid, error } = await CheckCategories(categories)
    if (error && !isValid) {
      redirect('/404')
    }

    const { data: productData, error: productError, totalCount } = await FetchProductsByCategories(categories, page, searchParams.sort)
    if (!productData || productError) {
      redirect('/404')
    }

    const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE)

    return (
      <div className='md:mx-auto px-6 md:px-[64px] max-w-[1440px]'>
        <CategoryNavigation categories={category_objects} className='hidden md:flex' />
        <div className='md:mt-16 flex md:flex md:items-center md:justify-between'>
          <Link href="/">
            <ChevronLeft strokeWidth={1} className='ml-[-16px]' color='#000000' size={44} />
          </Link>
          <h2 className='md:text-5xl hidden md:block'>{capitalize(category_objects[category_objects.length - 1].name)}</h2>
          <MapButton className='hidden md:flex' />
        </div>
        <div className='md:px-10 mt-4 md:mt-10 mb-[100px] md:mb-0 md:max-w-[860px] lg:max-w-[1152px] xl:max-w-[1310px] sm:max-w-[540px] mx-auto'>
          <div className={'lg:ml-[2%] xl:ml-[1%]'}>
            <SortDropdown currentPage={page} />
          </div>
          <div className='md:mt-10 mt-4'>
            <ProductList
              initialProducts={productData}
              totalPages={totalPages}
              currentPage={page}
              type='category'
              categories={categories}
              currentSort={searchParams.sort}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryPage