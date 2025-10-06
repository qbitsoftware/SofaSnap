import { addClick, fetchProduct, fetchSimilarProducts } from '@/utils/supabase/queries/products'
import { redirect } from 'next/navigation'
import React from 'react'
import { ProductComponent } from './product'
import { CategoryNavigation } from './category-navigation'
import { ChevronLeft } from 'lucide-react'
import { ServerError } from '@/components/server-error'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SimilarProducts } from './similar-products'
import { GetUserInfo } from '@/app/actions'
import { User } from '@/utils/supabase/supabase.types'

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

  const categorySlug = data.category?.name_slug || categories[0]?.name_slug
  const { data: similarProducts } = await fetchSimilarProducts(categorySlug, product_id, 8)

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
          {<ProductComponent product={data} user={user.data.user as User} />}
        </div>

      </div>
      <div className={cn('md:mt-[100px] mt-[50px]')}>
        {similarProducts && similarProducts.length > 0 && (
          <SimilarProducts products={similarProducts} />
        )}
      </div>
    </div >
  )
}