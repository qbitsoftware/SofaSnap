import React from 'react'
import { AddProductForm } from './components/addProductForm'
import { GetUserInfo } from '@/app/actions'
import { AddProduct } from './components/breadcrumb'
import { FetchCategories } from '@/utils/supabase/queries/categories'
import { redirect } from 'next/navigation'
import { ServerError } from '@/components/server-error'


const Page = async () => {
    const user = await GetUserInfo()
    const { data, error } = await FetchCategories()
    if (error == "Server error") {
        return <ServerError />
    } else if (error || !data) {
        redirect("/404")
    } 

    return (
        <div className='flex flex-col justify-center xl:max-w-[1440px] w-full px-[56px] pt-[30px] mx-auto'>
            <div className='mb-[38px]'>
                <AddProduct />
            </div>
            <div className='ml-[135px] mb-[179px]'>
                <AddProductForm id={user.data.user?.id!} categories={data} />
            </div>

            {/* <div className='w-[326px] h-[130px] mb-[200px] mx-auto'>
              <Image alt='logo' width={326} height={130} src={"/branding/logo-meist.svg"}/>
          </div> */}
        </div>
    )
}

export default Page