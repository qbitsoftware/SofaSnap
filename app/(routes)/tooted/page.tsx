import React from 'react'
import { Products } from './[...slug]/components/products'
import { fetchAllProducts } from '@/utils/supabase/queries/products'
import { ProductList } from './[...slug]/components/product-list'


const Page = async () => {

  const {data,error} = await fetchAllProducts()



  return (
    <div>
       <ProductList initialProducts={data!}/> 
    </div>
  )
}

export default Page