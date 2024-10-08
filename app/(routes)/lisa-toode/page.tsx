import React from 'react'
import { AddProductForm } from './components/addProductForm'
import { GetUserInfo } from '@/app/actions'
import { AddProduct } from './components/breadcrumb'
import { FetchCategories } from '@/utils/supabase/queries/categories'
import { redirect } from 'next/navigation'
import { ServerError } from '@/components/server-error'
import { TSignUpSchema } from '@/lib/register-validation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const Page = async () => {
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
    console.log("UserInfo", userInfo.agreement)

    return (
        <div className='flex flex-col xl:max-w-[1440px] w-full px-[56px] pt-[30px] mx-auto '>
            <div className='flex flex-col justify-center items-center md:items-start md:justify-start'>
                <div className='mb-[38px] hidden md:inline'>
                    <AddProduct />
                </div>
                <div className='md:ml-[135px] mb-[179px]'>
                    <AddProductForm id={user.data.user.id} categories={data} user_metadata={userInfo} />
                </div>

                {/* <div className='w-[326px] h-[130px] mb-[200px] mx-auto'>
                      <Image alt='logo' width={326} height={130} src={"/branding/logo-meist.svg"}/>
                  </div> */}

            </div>
            <div>
                <Button>
                    <Link href={"/kuulutused"}>
                        Minu kuulutused
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Page