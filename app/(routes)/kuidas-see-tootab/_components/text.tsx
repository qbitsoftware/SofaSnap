"use client"
import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'
import Image from 'next/image'
import { useTranslation } from '@/lib/i18n/i18n-provider'

export const Text = () => {
    const { t } = useTranslation();

    return (
        <div className={cn('text-justify md:text-left flex flex-col gap-6 px-4 md:px-0', poppins.className)}>
            <p className='text-lg'>
                <strong>{t('howItWorks.title')}</strong>
            </p>
            {/* Punkt 1  */}
            <div className='flex flex-col lg:flex-row gap-4 my-10 lg:ml-[300px]'>
                <Image src="/images/sofasnap-4.png" alt={t('howItWorks.step1.imageAlt')} width={150} height={150} className='w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] mx-auto lg:mx-0' />
                <div>
                    <p className='font-bold'>{t('howItWorks.step1.title')}</p>
                    <li>{t('howItWorks.step1.description')}</li>
                </div>
            </div>
            {/* Punkt 2 */}
            <div className='mb-10 max-w-[600px] flex flex-col gap-2'>
                <p className='font-bold'>{t('howItWorks.step2.title')}</p>
                <div className='flex flex-col gap-4'>
                    <li>{t('howItWorks.step2.items.0')}</li>
                    <li>{t('howItWorks.step2.items.1')}</li>
                    <li>{t('howItWorks.step2.items.2')}</li>
                </div>
            </div>
            <div className='lg:ml-20 flex flex-col lg:flex-row gap-4 justify-between'>
                <div className='max-w-[500px]'>
                    <p className='font-bold'>{t('howItWorks.step3.title')}</p>
                    <li>{t('howItWorks.step3.items.0')}</li>
                    <li>{t('howItWorks.step3.items.1')}</li>
                    <li>{t('howItWorks.step3.items.2')}</li>
                </div>
                <Image src="/images/sofasnap-3.png" alt={t('howItWorks.step3.imageAlt')} width={450} height={260} className='w-full max-w-[300px] lg:max-w-[450px] h-auto mx-auto lg:mx-0' />
            </div>
        </div>
    )
}

export const TextWithImage = () => {
    const { t } = useTranslation();

    return (
        <div className='relative w-screen bg-[#FAD8CC] min-h-[250px] lg:min-h-[250px] pt-8 lg:pt-20'>
            <div className='max-w-7xl mx-auto px-4 flex justify-center items-center flex-col gap-2'>
                <p className='font-bold text-center'>{t('howItWorks.step4.title')}</p>
                <ul className='text-center px-4'>
                    <li>{t('howItWorks.step4.description')}</li>
                </ul>
            </div>
            <div className='relative max-w-6xl mx-auto px-4'>
                <Image
                    src="/images/sofasnap-2.png"
                    alt={t('howItWorks.step4.imageAlt')}
                    width={350}
                    height={350}
                    className='mx-auto w-full max-w-[200px] lg:max-w-[350px] h-auto transform lg:translate-y-1/3'
                />
            </div>
        </div>
    )
}

export const TextWithImage2 = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className='relative w-screen bg-[#E8EBE8] h-auto min-h-[400px] lg:min-h-[500px] py-12 lg:py-32'>
                <div className='text-center text-lg lg:text-2xl max-w-6xl mx-auto px-4'>
                    <p className='font-bold'>{t('howItWorks.conclusion')}</p>
                </div>
                <div className='relative max-w-7xl mx-auto px-4'>
                    <Image
                        src="/images/sofasnap-1.png"
                        alt={t('howItWorks.step4.imageAlt')}
                        width={700}
                        height={340}
                        className='mx-auto w-full max-w-[500px] lg:max-w-[860px] h-auto transform lg:translate-y-1/4'
                    />
                </div>
            </div>
            {/* <div className='lg:h-[200px]'></div> */}
        </>
    )
}

export const Text2 = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col pt-16 lg:pt-48 gap-4 lg:gap-16 px-4 md:px-0'>
            {/* Punkt 5 */}
            <div>
                <p className='font-bold lg:pb-10'>{t('howItWorks.step5.title')}</p>
                <li>{t('howItWorks.step5.items.0')}</li>
                <li>{t('howItWorks.step5.items.1')}</li>
            </div>
            {/* Punkt 6 */}
            <div className='pt-8'>
                <p className='font-bold lg:pb-10'>{t('howItWorks.step6.title')}</p>
                <li>{t('howItWorks.step6.items.0')}</li>
                <li>{t('howItWorks.step6.items.1')}</li>
                <li>{t('howItWorks.step6.items.2')}</li>
            </div>
            {/* Punkt 7 */}
            <div className='pt-8'>
                <p className='font-bold'>{t('howItWorks.step7.title')}</p>
                <li>{t('howItWorks.step7.description')}</li>
            </div>
            {/* Punkt 8 */}
            <div className='pt-8 pb-[52px]'>
                <p className='font-bold'>{t('howItWorks.step8.title')}</p>
                <li>{t('howItWorks.step8.description')}</li>
            </div>
        </div>
    )
}