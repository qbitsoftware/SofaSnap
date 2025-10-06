"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'
import { useTranslation } from '@/lib/i18n/i18n-provider'

export const Text = () => {
    const { t } = useTranslation()

    return (
        <div className={cn('text-justify md:text-left flex flex-col gap-6', poppins.className)}>
            <p className='text-lg'>
                <strong>{t('terms.lastUpdated')}</strong>
            </p>
            <p>
                {t('terms.intro')}
            </p>
            {/* Section 1 */}
            <div>
                <p><strong>{t('terms.section1.title')}</strong></p>
                <ul>
                    <li>{t('terms.section1.items.1')}</li>
                    <li>{t('terms.section1.items.2')}</li>
                    <li>{t('terms.section1.items.3')}</li>
                </ul>
            </div>
            {/* Section 2 */}
            <div>
                <p><strong>{t('terms.section2.title')}</strong></p>
                <ul>
                    <li>{t('terms.section2.items.1')}</li>
                    <li>{t('terms.section2.items.2')}</li>
                    <li>{t('terms.section2.items.3')}</li>
                    <li>{t('terms.section2.items.4')}</li>
                </ul>
            </div>
            {/* Section 3 */}
            <div>
                <p><strong>{t('terms.section3.title')}</strong></p>
                <ul>
                    <li>{t('terms.section3.items.1')}</li>
                    <li>{t('terms.section3.items.2')}</li>
                    <li>{t('terms.section3.items.3')}</li>
                </ul>
            </div>
            {/* Section 4 */}
            <div>
                <p><strong>{t('terms.section4.title')}</strong></p>
                <ul>
                    <li>{t('terms.section4.items.1')}</li>
                    <li>{t('terms.section4.items.2')}</li>
                </ul>
            </div>
            {/* Section 5 */}
            <div>
                <p><strong>{t('terms.section5.title')}</strong></p>
                <ul>
                    <li>{t('terms.section5.items.1')}</li>
                    <li>{t('terms.section5.items.2')}</li>
                </ul>
            </div>
            {/* Section 6 */}
            <div>
                <p><strong>{t('terms.section6.title')}</strong></p>
                <ul>
                    <li>{t('terms.section6.items.1')}</li>
                    <li>{t('terms.section6.items.2')}</li>
                    <li>{t('terms.section6.items.3')}</li>
                </ul>
            </div>
            {/* Section 7 */}
            <div>
                <p><strong>{t('terms.section7.title')}</strong></p>
                <ul>
                    <li>{t('terms.section7.items.1')}</li>
                    <li>{t('terms.section7.items.2')}</li>
                </ul>
            </div>
            {/* Section 8 */}
            <div>
                <p><strong>{t('terms.section8.title')}</strong></p>
                <p>{t('terms.section8.description')}</p>
            </div>
            {/* Section 9 */}
            <div>
                <p><strong>{t('terms.section9.title')}</strong></p>
                <ul>
                    <li>{t('terms.section9.items.1')}</li>
                    <li>{t('terms.section9.items.2')}</li>
                </ul>
            </div>
            {/* Section 10 */}
            <div className='pb-[52px]'>
                <p><strong>{t('terms.section10.title')}</strong></p>
                <p>{t('terms.section10.description')}</p>
                <ul>
                    <li>{t('terms.section10.email')}</li>
                    <li>{t('terms.section10.phone')}</li>
                </ul>
            </div>
            <div className='text-center'>
                <p><strong>{t('terms.conclusion')}</strong></p>
                </div>
        </div>
    )
}
