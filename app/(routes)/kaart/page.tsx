import GoogleMapComponent from '@/components/map'
import { ServerError } from '@/components/server-error'
import { Button } from '@/components/ui/button'
import { FetchCategories } from '@/utils/supabase/queries/categories'
import { fetchProductsWithAddresses } from '@/utils/supabase/queries/products'
import { capitalize } from '@/utils/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const MapPage = async () => {
  const { data:categories, error:categoriesError } = await FetchCategories()
  const {data:products, error:productsError} = await fetchProductsWithAddresses()

  if (categoriesError && categoriesError == "Server error" || productsError && productsError == "Server error") {
    return <ServerError />
  }

  if (!categories || !products) {
    redirect("/404")
  }

  console.log("WTF", products)

  console.log(process.env.GOOGLE_MAPS_KEY!)

  return (
    <div className='max-w-[1440px] mx-auto md:px-16 px-6 min-h-screen'>
      <div className='flex justify-between items-center md:mt-10'>
        <ChevronLeft size={56} className='md:ml-[-16px]' />
        <h1 className='md:text-5xl'>Leia sobiv toode kaardilt</h1>
        <Button className='bg-secondary rounded-full px-6 py-6 '>
          Kuva tooted
        </Button>
      </div>
      <div className='flex w-full justify-evenly md:mt-[60px]'>
        {categories.map((category) => (
          <Link key={category.id} href={`/tooted/${category.name_slug}`}>
            <h3>{capitalize(category.name)}</h3>
          </Link>
        ))}
      </div>
      <div className='w-full md:h-[848px] h-[80vh] md:my-[60px]'>
        <GoogleMapComponent products={products} api={process.env.GOOGLE_MAPS_KEY!}/>
      </div>
    </div>
  )
}

export default MapPage