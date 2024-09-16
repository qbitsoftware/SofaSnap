import React from 'react'
import ProductPage from './components/product-page'
import { CategoryNavigation } from './components/category-navigation'

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
        <div className='mt-16'>
          Teree
        </div>
        {/* {...params.slug} */}
      </div>
    )
  }

}

export default CategoryPage