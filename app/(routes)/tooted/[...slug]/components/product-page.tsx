import { ServerError } from '@/components/server-error'
import { fetchProduct } from '@/utils/supabase/queries/products'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProductComponent } from './product'
import { CategoryNavigation } from './category-navigation'
import { MapButton } from '@/components/map-button'
import { ChevronLeft } from 'lucide-react'
import { capitalize } from '@/utils/utils'
import { product, user } from '@/utils/supabase/schema'
import Image from 'next/image'
import { ProductImage } from './product-image'
import { OwnerRating } from './owner-rating'
import { Reviews } from './reviews'
import { DateForm } from './rent-form'
import db from '@/utils/supabase/db'

interface ProductPageProps {
  product_id: number
  slugs: string[]
}

const ProductPage: React.FC<ProductPageProps> = async ({ slugs, product_id }) => {
  const { data, error } = await fetchProduct(product_id)
  const result = await db.select().from(user)
  console.log(result)
  console.log()
  if (error == "Server error") {
    return (
      <ServerError />
    )
  }

  if (error || !data) {
    redirect("/404")
  }

  // Reviews placeholder
  const sampleReviews = [
    {
      name: "John Doe",
      rating: 5,
      feedback: "Absolutely loved this! Exceeded my expectations in every way. Highly recommend!"
    },
    {
      name: "Jane Smith",
      rating: 4,
      feedback: "Great experience overall, but there’s always room for improvement. Will definitely use again."
    },
    {
      name: "Michael Brown",
      rating: 3,
      feedback: "It was okay, nothing extraordinary but got the job done."
    },
    {
      name: "Tom Harris",
      rating: 2,
      feedback: "Not really what I was expecting, had some issues with the product."
    }
  ];
  

  return (
    <div className='md:min-h-screen w-full'>
      <div className='max-w-[1440px] md:px-16 mx-auto'>
        <CategoryNavigation categories={slugs.slice(0, -1).concat(data![0].name)} />
        <div className='md:mt-16 md:flex md:items-center md:justify-between'>
          <ChevronLeft color='#555555' size={44} />
        </div>
        <div className='mt-8'>
          {<ProductComponent product={data[0]} />}
        </div>
      </div>
      <div className='md:mt-[100px]'>
        <ProductImage product={data[0]}/>
      </div>
      <div className='bg-[#CBD3CB]/35 '>
        <div className='md:px-16 max-w-[1440px] mx-auto md:min-h-[190px] flex items-center'>
          <OwnerRating  />
        </div>
      </div>
      <Reviews reviews={sampleReviews} className='md:my-[150px] mx-auto md:w-[80%] max-w-[1280px]'/>
      <div className='w-full mx-auto'>
        <DateForm product={data[0]}/>
      </div>
    </div >
  )
}

export default ProductPage