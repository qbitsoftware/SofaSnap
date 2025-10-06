"use client"

import React, { useEffect, useState, Suspense } from 'react'
import { ProductList } from './[...slug]/_components/product-list'
import { fetchProducts } from '@/app/actions'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { SortDropdown } from './[...slug]/_components/sort-dropdown'
import { EmptyState } from './[...slug]/_components/empty-state'
import { useTranslation } from '@/lib/i18n/i18n-provider'
import { useSearchParams } from 'next/navigation'

const PRODUCTS_PER_PAGE = 30

function ProductsContent() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1
  const sort = searchParams.get('sort') || undefined

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)
      const { data, error, totalCount } = await fetchProducts(currentPage, sort)

      if (error) {
        console.error("Error fetching products:", error)
        setError(error)
      } else {
        setProducts(data || [])
        setTotalPages(Math.ceil(totalCount / PRODUCTS_PER_PAGE))
      }
      setIsLoading(false)
    }

    loadProducts()
  }, [currentPage, sort])

  if (error) {
    return <div>{t('products.errorLoading')}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

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
          {!products || products.length === 0 ?
            <EmptyState message="noProducts" />
            :
            <ProductList
              initialProducts={products}
              totalPages={totalPages}
              currentPage={currentPage}
              type={"product"}
              categories={undefined}
              currentSort={sort}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}