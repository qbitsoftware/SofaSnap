import { addClick, fetchProduct } from '@/utils/supabase/queries/products'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProductComponent } from './product'
import { CategoryNavigation } from './category-navigation'
import { ChevronLeft } from 'lucide-react'
import { ServerError } from '@/components/server-error'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ProductImage } from './product-image'
import { GetUserInfo } from '@/app/actions'

interface ProductPageProps {
  product_id: number
  slugs: string[]
  categories: {
    name: string
    name_slug: string
  }[]
}

export default async function ProductPage({ product_id, categories }: ProductPageProps) {

  const user = await GetUserInfo()

  if (!user.data.user) {
    redirect("/login")
  }

  const { data, error } = await fetchProduct(product_id)

  if (error && error == "Server error") {
    console.log(error)
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
          {<ProductComponent product={data} user={user.data.user} />}
        </div>

      </div>
      <div className={cn('md:mt-[100px] mt-[50px]')}>
        <ProductImage product={data} />
      </div>
    </div >
  )
}