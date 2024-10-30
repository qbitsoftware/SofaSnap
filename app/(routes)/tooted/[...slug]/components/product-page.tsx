import { addClick, fetchProduct, getProductReviews } from '@/utils/supabase/queries/products'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProductComponent } from './product'
import { CategoryNavigation } from './category-navigation'
import { ChevronLeft } from 'lucide-react'
import { ProductImage } from './product-image'
import { Reviews } from './reviews'
import { RentForm } from './rent-form'
import AddressComponent from './address'
import { ServerError } from '@/components/server-error'
import { SellForm } from './sell-form'
import Link from 'next/link'
import ReviewForm from './product-review-form'

interface ProductPageProps {
  product_id: number
  slugs: string[]
  categories: {
    name: string
    name_slug: string
  }[]
}

const ProductPage: React.FC<ProductPageProps> = async ({ product_id, categories }) => {
  const { data, error } = await fetchProduct(product_id)
  const { data: reviews, error: reviewError } = await getProductReviews(product_id)


  if (error && error == "Server error") {
    return (
      <ServerError />
    )
  }

  await addClick(product_id)

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
          <Link href={"/tooted"}>
            <ChevronLeft strokeWidth={1} color='#555555' size={44} />
          </Link>
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
      <div className='w-full mx-auto'>
        {data.type == "rent"
          ? <RentForm product={data} />
          : <SellForm product={data} />
        }
      </div>
      <div className='flex justify-center'>
        <ReviewForm product_id={product_id} />
      </div>
      <div className='md:mb-[200px]'>
        <AddressComponent product={data} className="" />
      </div>
    </div >
  )
}

export default ProductPage