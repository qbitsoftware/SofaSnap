'use client'

import React, { useState } from 'react'
import GoogleMapComponent from '@/components/map'
import { capitalize } from '@/utils/utils'
import { Category, ProductWithAddress } from '@/utils/supabase/supabase.types'

interface ClientMapPageProps {
  initialProducts: ProductWithAddress[]
  categories: Category[]
  mapApiKey: string
}

export const ClientMapPage: React.FC<ClientMapPageProps> = ({ initialProducts, categories, mapApiKey }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts)

  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null)
      setDisplayedProducts(initialProducts)
    } else {
      setSelectedCategory(categoryName)
      const filteredProducts = initialProducts.filter(product => product.category.name === categoryName)
      setDisplayedProducts(filteredProducts)
    }
  }

  return (
    <div className='max-w-[1440px] mx-auto md:px-16 px-6 min-h-screen'>
      <div className='flex w-full justify-evenly md:mt-[60px]'>
        {categories.map((category) => {
          return category.sub_categories?.length !== 0 && (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={`focus:outline-none focus:ring-primary ${selectedCategory === category.name ? 'text-primary font-bold' : ''}`}
            >
              <h3>{capitalize(category.name)}</h3>
            </button>
          );
        })}
      </div>
      <div className='w-full md:h-[848px] h-[80vh] md:my-[60px]'>
        <GoogleMapComponent products={displayedProducts} api={mapApiKey} />
      </div>
    </div >
  )
}