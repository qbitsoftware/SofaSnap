import React from 'react'
import { ProductList } from './[...slug]/components/product-list'
import { fetchProducts } from '@/app/actions'
import { ChevronLeft } from 'lucide-react'
import { MapButton } from '@/components/map-button'
import { Filter } from './[...slug]/components/filter'
import Link from 'next/link'

const PRODUCTS_PER_PAGE = 30

const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1

  const { data, error, totalCount } = await fetchProducts(currentPage)

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
        <Filter className='md:hidden'/>
        <MapButton className='md:flex hidden' />
      </div>
      <div className='md:px-10 mt-4 md:mt-10 mb-[100px] md:mb-0 md:max-w-[860px] lg:max-w-[1152px] xl:max-w-[1310px] sm:max-w-[540px] mx-auto'>
        <Filter className='hidden md:block'/>
        <div className='mt-4 md:mt-10'>
          <ProductList
            initialProducts={data || []}
            totalPages={totalPages}
            currentPage={currentPage}
            type={"product"}
            categories={undefined}
          />
        </div>
      </div>
    </div>
  )
}

export default Page