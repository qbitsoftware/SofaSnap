import { ServerError } from '@/components/server-error'
import { Button } from '@/components/ui/button'
import { FetchCategories } from '@/utils/supabase/queries/categories'
import { fetchProductsWithAddresses } from '@/utils/supabase/queries/products'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { ClientMapPage } from './components/client-map-page'

const MapPage = async () => {
  const { data:categories, error:categoriesError } = await FetchCategories()
  const {data:products, error:productsError} = await fetchProductsWithAddresses()

  if (categoriesError && categoriesError == "Server error" || productsError && productsError == "Server error") {
    return <ServerError />
  }

  if (!categories || !products) {
    redirect("/404")
  }

  console.log(process.env.GOOGLE_MAPS_KEY!)

  return (
    <div className='max-w-[1440px] mx-auto md:px-16 px-6 min-h-screen'>
      <div className='flex justify-between items-center md:mt-10'>
        <ChevronLeft strokeWidth={1} size={56} className='md:ml-[-16px]' />
        <h1 className='md:text-5xl'>Leia sobiv toode kaardilt</h1>
        <Link href={"/tooted"}>
          <Button className='bg-secondary rounded-full px-6 py-6 '>
            Kuva tooted
          </Button>
        </Link>
      </div>
      <ClientMapPage initialProducts={products} categories={categories} mapApiKey={process.env.GOOGLE_MAPS_KEY!}/>
    </div>
  )
}

export default MapPage