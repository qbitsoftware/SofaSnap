import React from 'react'
import ProductPage from './components/product-page'
import { CategoryNavigation } from './components/category-navigation'
import { ChevronLeft } from 'lucide-react'
import { MapButton } from '@/components/map-button'
import { capitalize } from '@/utils/utils'

const CategoryPage = ({
  params
}: {
  params: { slug: string[] }
}) => {

  if (Number(params.slug[params.slug.length - 1]) && params.slug.length > 1) {
    return (
      <ProductPage product_id={Number(params.slug[params.slug.length - 1])} />
    )
  } else {
    return (
      <div className='md:mx-auto md:px-[64px] max-w-[1440px]'>
        <CategoryNavigation categories={params.slug} />
        <div className='md:mt-16 md:flex md:items-center md:justify-between'>
          <ChevronLeft color='#555555' size={44} />
          <h2 className='md:text-5xl'>{capitalize(params.slug[params.slug.length - 1])}</h2>
          <MapButton className=''/>
        </div>
        <div className='md:px-10'>

        </div>
        {/* {...params.slug} */}
      </div>
    )
  }

}

export default CategoryPage