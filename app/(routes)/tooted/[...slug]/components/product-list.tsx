'use client'

import React, { useEffect, useState } from 'react'
import { Product } from '@/utils/supabase/supabase.types'
import { Products } from './products'
import { fetchAllProducts } from '@/utils/supabase/queries/products'

export const ProductList = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreProducts = async () => {
    "use server"
    if (loading || !hasMore) return

    setLoading(true)
    const nextPage = page + 1
    const res = await fetchAllProducts()
    const newProducts: Product[] = res.data!

    if (newProducts.length < 40) {
      setHasMore(false)
    }

    setProducts(prevProducts => [...prevProducts, ...newProducts])
    setPage(nextPage)
    setLoading(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreProducts()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore])

  return (
    <div>
      <Products products={products} />
      {loading && <p className="text-center mt-4">Loading more products...</p>}
      {!hasMore && <p className="text-center mt-4">No more products to load</p>}
    </div>
  )
}
