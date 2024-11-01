import React, { Suspense } from 'react'
import { AddProductForm } from './components/addProductForm'
import { GetUserInfo } from '@/app/actions'
import { AddProduct } from './components/breadcrumb'
import { FetchCategories } from '@/utils/supabase/queries/categories'
import { redirect } from 'next/navigation'
import { ServerError } from '@/components/server-error'
import { TSignUpSchema } from '@/lib/register-validation'
import LoadingSpinner from '../kuulutused/components/loading-spinner'


const BeforeLoading = async () => {
    const user = await GetUserInfo()
    const { data, error } = await FetchCategories()
    if (error == "Server error") {
        return <ServerError />
    } else if (error || !data) {
        redirect("/404")
    }
    if (!user.data.user) {
        redirect("/login")
    }

    const userInfo = user.data.user.user_metadata as TSignUpSchema

    return (
        <div className='flex flex-col md:flex-row xl:max-w-[1440px] w-full sm:px-[56px] pt-[30px] mx-auto'>
            <div className='flex flex-col justify-center items-center md:items-start md:justify-start'>
                <div className='mb-[38px] hidden md:inline'>
                    <AddProduct />
                </div>
                <div className='min-w-[340px] max-w-[360px] sm:max-w-[400px] md:max-w-[500px]  md:ml-[135px] mb-[179px] w-full'>
                    <AddProductForm id={user.data.user.id} categories={data} user_metadata={userInfo} initialData={null} />
                </div>

            </div>
        </div>
    )
}


const Page = () => {
    return (
        <div className="container mx-auto p-4">
            <Suspense fallback={<LoadingSpinner />}>
                <BeforeLoading />
            </Suspense>
        </div>
    )
}

export default Page