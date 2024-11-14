'use client'

import React, { useState } from 'react'
import GoogleMapComponent from '@/components/map'
import { capitalize } from '@/utils/utils'
import { Category, ProductWithAddress } from '@/utils/supabase/supabase.types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ClientMapPageProps {
  initialProducts: ProductWithAddress[]
  categories: Category[]
  mapApiKey: string
}

export const ClientMapPage: React.FC<ClientMapPageProps> = ({ initialProducts, categories, mapApiKey }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts)

  const handleCategoryChange = (categoryName: string) => {
    if (categoryName === "all") {
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
      <div className='w-full md:mt-[60px]'>
        <div className='hidden lg:flex justify-evenly'>
          {categories.map((category) => {
            return category.sub_categories?.length !== 0 && (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.name)}
                className={`focus:outline-none focus:ring-primary ${selectedCategory === category.name ? 'text-primary font-bold' : ''}`}
              >
                <h3>{capitalize(category.name)}</h3>
              </button>
            );
          })}
        </div>

        {/* Mobile view: Select dropdown */}
        <div className='lg:hidden w-full mb-4 mt-10'>
          <Select onValueChange={handleCategoryChange} value={selectedCategory || "all"}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Vali kategooria</SelectItem>
              {categories.map((category) => (
                category.sub_categories?.length !== 0 && (
                  <SelectItem key={category.id} value={category.name}>
                    {capitalize(category.name)}
                  </SelectItem>
                )
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='w-full md:h-[848px] h-[80vh] md:my-[60px]'>
        <GoogleMapComponent products={displayedProducts} api={mapApiKey} />
      </div>
    </div>
  )
}