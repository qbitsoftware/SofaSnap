import { addClick, fetchProduct, getProductReviews } from '@/utils/supabase/queries/products'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProductComponent } from './product'
import { CategoryNavigation } from './category-navigation'
import { ChevronLeft } from 'lucide-react'
import { ProductImage } from './product-image'
import { ReviewsComp } from './reviews'
import { RentForm } from './rent-form'
import AddressComponent from './address'
import { ServerError } from '@/components/server-error'
import { SellForm } from './sell-form'
import Link from 'next/link'
import { GetUserInfo } from '@/app/actions'
import { getOrderItemsByProduct } from '@/utils/supabase/queries/orders'
import { cn } from '@/lib/utils'

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
  const { data: reviews} = await getProductReviews(product_id)
  const {data: orderItems, error: orderItemError} = await getOrderItemsByProduct(product_id) 


  if (error && error == "Server error" || orderItemError && orderItemError == "Server error" ) {
    return (
      <ServerError />
    )
  }

  await addClick(product_id)

  if (error || !data) {
    redirect("/404")
  }

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
      <div className={cn('md:mt-[100px] mt-[50px', data.type == "sell" ? "mb-[150px]" : "mb-20")}>
        <ProductImage product={data} />
      </div>
      {/* <div className='bg-[#CBD3CB]/35 '>
        <div className='md:px-16 px-6 max-w-[1440px] mt-2 mx-auto h-[86px] md:min-h-[190px] flex items-center'>
          <OwnerRating owner={user}/>
        </div>
      </div> */}
      {
        data.type == "rent" &&
        <ReviewsComp reviews={reviews} className='md:my-[150px] mx-auto md:w-[80%] max-w-[1280px]' />
      }
      {/* <div className='flex justify-center'>
        <ReviewForm product_id={product_id} />
      </div> */}

      <div className='w-full mx-auto'>
          {data.type == "rent"
              ? <RentForm product={data} user={user.data.user} orderItems={orderItems!}/>
              : <SellForm product={data} user={user.data.user} />
          }
        </div>
      <div className='md:mb-[200px]'>
        <AddressComponent product={data} className="" />
      </div>
    </div >
  )
}

export default ProductPage