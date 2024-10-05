'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Product } from '@/utils/supabase/supabase.types'
import { Products } from './products'
import { useIsMobile } from '@/hooks/useIsMobile'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { FetchProductsByCategories, fetchProducts } from '@/app/actions'
import { ClipLoader } from 'react-spinners'


const PRODUCTS_PER_PAGE = 2

interface ProductListProps {
  initialProducts: Product[]
  totalPages: number
  currentPage: number
  type: string
  categories: string[] | undefined 
}

export const ProductList: React.FC<ProductListProps> = ({ initialProducts, totalPages, currentPage, type, categories }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [page, setPage] = useState(currentPage)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(page < totalPages)
  const observerTarget = useRef(null)
  const loadingRef = useRef(false)
  const isMobile = useIsMobile()


  const loadMoreProducts = useCallback(async () => {
    if (loadingRef.current || !hasMore) return

    loadingRef.current = true
    setLoading(true)

    const nextPage = page + 1

    let data, error;

    if (type === "category" && categories) {
        ({ data, error } = await FetchProductsByCategories(categories, nextPage));
    } else {
        ({ data, error } = await fetchProducts(nextPage));
    }
    
    

    if (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
      loadingRef.current = false
      return
    }

    if (!data || data.length === 0) {
      setHasMore(false)
      setLoading(false)
      loadingRef.current = false
      return
    }

    setProducts(prevProducts => {
      const newProducts = data.filter((newProduct:Product)=> 
        !prevProducts.some(existingProduct => existingProduct.id === newProduct.id)
      )
      return [...prevProducts, ...newProducts]
    })

    if (data.length < PRODUCTS_PER_PAGE) {
      setHasMore(false)
    }

    setPage(nextPage)
    setLoading(false)
    loadingRef.current = false
  }, [hasMore, page, fetchProducts])

  useEffect(() => {
    if (!isMobile) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          loadMoreProducts()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [loadMoreProducts, hasMore, isMobile])

  return (
    <div>
      <Products products={products} />
      {isMobile ? (
        <div 
          ref={observerTarget} 
          className="h-10 w-full flex items-center justify-center"
        >
          {loading &&  <ClipLoader
                        className='mt-4'
                        color={"#000000"}
                        loading={loading}
                        size={40}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
        </div>
      ) : (
        <div className='my-[100px] hidden md:block'>
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
      )}
    </div>
  )
}