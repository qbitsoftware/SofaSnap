import React from 'react'
import { Text, Text2, TextWithImage, TextWithImage2 } from './_components/text'
import { Breadcrumb } from '@/components/breadcrumb'

const Page = () => {
    return (
        <div>
            <div className='flex flex-col justify-center xl:max-w-[1440px] w-full px-4 lg:px-[56px] pt-[30px] mx-auto'>
                <div className='mb-[38px]'>
                    <Breadcrumb text='Kuidas töötab?' link='/' />
                </div>
                <div className='lg:ml-[60px] xl:ml-[135px] mb-[69px]'>
                    <Text />
                </div>
            </div>
            <TextWithImage />
            <div className='flex flex-col justify-center xl:max-w-[1440px] w-full px-4 lg:px-[56px] pt-[30px] mx-auto'>
                <div className='lg:ml-[60px] xl:ml-[135px] mb-[69px]'>
                    <Text2 />
                </div>
            </div>
            <TextWithImage2 />
        </div>
    )
}

export default Page
