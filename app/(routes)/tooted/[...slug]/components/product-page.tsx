import { fetchProduct } from '@/utils/supabase/queries/products'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProductComponent } from './product'
import { CategoryNavigation } from './category-navigation'
import { ChevronLeft } from 'lucide-react'
import { ProductImage } from './product-image'
import { Reviews } from './reviews'
import { RentForm } from './rent-form'
import AddressComponent from './address'
// import { OwnerRating } from './owner-rating'
import { ServerError } from '@/components/server-error'
import { SellForm } from './sell-form'
import { GetUserInfo } from '@/app/actions'

interface ProductPageProps {
  product_id: number
  slugs: string[]
  categories: {
    name: string
    name_slug: string
  }[]
}

const ProductPage: React.FC<ProductPageProps> = async ({ product_id, categories }) => {
  const user = await GetUserInfo()
  const { data, error } = await fetchProduct(product_id)

  if (error && error == "Server error") {
    return (
      <ServerError />
    )
  }

  if (error || !data) {
    redirect("/404")
  }
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
      <div className='max-w-[1440px] md:px-16 px-6 mx-auto'>
        <CategoryNavigation className='hidden md:block' categories={categories.slice(0, -1)} product={data} />
        <div className='md:mt-16 ml-[-16px] md:flex md:items-center md:justify-between'>
          <ChevronLeft strokeWidth={1} color='#555555' size={44} />
        </div>
        <div className='mt-8'>
          {<ProductComponent product={data} />}
        </div>
      </div>
      <div className='md:mt-[100px] mt-[50px]'>
        <ProductImage product={data} />
      </div>
      {/* <div className='bg-[#CBD3CB]/35 '>
        <div className='md:px-16 px-6 max-w-[1440px] mt-2 mx-auto h-[86px] md:min-h-[190px] flex items-center'>
          <OwnerRating owner={user}/>
        </div>
      </div> */}
      <Reviews reviews={sampleReviews} className='hidden md:my-[150px] mx-auto md:w-[80%] max-w-[1280px]' />
      {/* {user.data.user?.id && */}
        <div className='w-full mx-auto'>
          {data.type == "rent"
            ? <RentForm product={data} user={user.data.user} />
            : <SellForm product={data} user={user.data.user} />
          }
        </div>
      {/* } */}
      <div className='md:mb-[200px]'>
        <AddressComponent product={data} className="" />
      </div>
    </div >
  )
}

export default ProductPage