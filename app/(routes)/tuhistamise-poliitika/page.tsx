import React from 'react'
import { Text } from './_components/text'
import { Breadcrumb } from '@/components/breadcrumb'

const Page = () => {
    return (
        <div className='flex flex-col justify-center  xl:max-w-[1440px] w-full px-[56px] pt-[30px] mx-auto'>
            <div className='mb-[38px]'>
                <Breadcrumb text='Tühistamise poliitika' link='/' />
            </div>
            <div className='md:ml-[60px] lg:ml-[135px] mb-[179px]'>
                <Text />
            </div>
        </div>
    )
}

export default Page