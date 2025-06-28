import React from 'react'
import { ProductList } from './[...slug]/components/product-list'
import { fetchProducts } from '@/app/actions'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { SortDropdown } from './[...slug]/components/sort-dropdown'
import { ShoppingBag } from 'lucide-react'

const PRODUCTS_PER_PAGE = 30
export const dynamic = 'force-dynamic';

const Page = async ({ searchParams }: { searchParams: { page?: string, sort?: string } }) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1

  const { data, error, totalCount } = await fetchProducts(currentPage, searchParams.sort)

  if (error) {
    console.error("Error fetching products:", error)
    return <div>Error loading products. Please try again later.</div>
  }

  const totalPages = Math.ceil(totalCount / PRODUCTS_PER_PAGE)

  return (
    <div className="md:mx-auto px-6 md:px-[64px] max-w-[1440px]">
      <div className='md:mt-16 flex md:flex md:items-center justify-between'>
        <Link href={"/"}>
          <ChevronLeft strokeWidth={1} className='ml-[-16px]' color='#000000' size={44} />
        </Link>
        <div className={'lg:ml-[2%] xl:ml-[1%] md:hidden'}>
          <SortDropdown currentPage={currentPage} />
        </div>
        {/* <MapButton className='md:flex hidden' /> */}
      </div>
      <div className='md:px-10 mt-4 md:mt-10 mb-[100px] md:mb-0 md:max-w-[860px] lg:max-w-[1152px] xl:max-w-[1310px] sm:max-w-[540px] mx-auto'>
        <div className={'lg:ml-[2%] xl:ml-[1%] hidden md:flex'}>
          <SortDropdown currentPage={currentPage} />
        </div>
        <div className='mt-4 md:mt-10'>
          {!data || data?.length == 0 ?
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-600">Tooted puuduvad</p>
            </div>
            :
            <ProductList
              initialProducts={data || []}
              totalPages={totalPages}
              currentPage={currentPage}
              type={"product"}
              categories={undefined}
              currentSort={searchParams.sort}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Page