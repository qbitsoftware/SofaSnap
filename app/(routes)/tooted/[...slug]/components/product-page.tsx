import { ServerError } from '@/components/server-error'
import { fetchProduct } from '@/utils/supabase/queries/products'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProductComponent } from './product'
import { CategoryNavigation } from './category-navigation'
import { ChevronLeft, MapPin, Pointer } from 'lucide-react'
import { address, user } from '@/utils/supabase/schema'
import { ProductImage } from './product-image'
import { Reviews } from './reviews'
import { DateForm } from './rent-form'
import db from '@/utils/supabase/db'
import GoogleMapComponent from '@/components/map'
import { OwnerRating } from './owner-rating'
import AddressComponent from './address'
import { eq } from 'drizzle-orm'

interface ProductPageProps {
  product_id: number
  slugs: string[]
  categories: {
    name: string
    name_slug: string
  }[]
}

const ProductPage: React.FC<ProductPageProps> = async ({ slugs, product_id, categories }) => {
  const { data, error } = await fetchProduct(product_id)


  if (error || !data) {
    redirect("/404")
  }

  const result = await db.select().from(address)
    .where(eq(address.id, 1))

  console.log("RESS", result)

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
        <CategoryNavigation categories={categories.slice(0, -1)} product={data[0]} />
        <div className='md:mt-16 md:flex md:items-center md:justify-between'>
          <ChevronLeft color='#555555' size={44} />
        </div>
        <div className='mt-8'>
          {<ProductComponent product={data[0]} />}
        </div>
      </div>
      <div className='md:mt-[100px]'>
        <ProductImage product={data[0]} />
      </div>
      <div className='bg-[#CBD3CB]/35 '>
        <div className='md:px-16 max-w-[1440px] mx-auto md:min-h-[190px] flex items-center'>
          {/* <OwnerRating  owner={}/> */}
        </div>
      </div>
      <Reviews reviews={sampleReviews} className='md:my-[150px] mx-auto md:w-[80%] max-w-[1280px]' />
      <div className='w-full mx-auto'>
        <DateForm product={data[0]} />
      </div>
      <div className='md:mb-[200px]'>
        <AddressComponent address={result[0]} className=""/>
      </div>
    </div >
  )
}

export default ProductPage