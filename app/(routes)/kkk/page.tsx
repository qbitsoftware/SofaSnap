"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'
import { Breadcrumb } from '@/components/breadcrumb'
import { useTranslation } from '@/lib/i18n/i18n-provider'

export default function FAQ() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center xl:max-w-[1440px] w-full px-4 lg:px-[56px] pt-[30px] mx-auto">
      <div className='mb-[38px]'>
        <Breadcrumb text={t('faq.breadcrumb')} link='/' />
      </div>
      <div className="lg:ml-[60px] xl:ml-[135px] mb-[69px]">
        <div className={cn('text-justify md:text-left flex flex-col gap-8', poppins.className)}>
          <p className='text-lg'>
            <strong>{t('faq.title')}</strong>
          </p>

          {/* Question 1 */}
          <div>
            <p><strong>1. {t('faq.questions.1.question')}</strong></p>
            <p>{t('faq.questions.1.answer')}</p>
          </div>

          {/* Question 2 */}
          <div>
            <p><strong>2. {t('faq.questions.2.question')}</strong></p>
            <p>{t('faq.questions.2.answer')}</p>
          </div>

          {/* Question 3 */}
          <div>
            <p><strong>3. {t('faq.questions.3.question')}</strong></p>
            <p>{t('faq.questions.3.answer')}</p>
          </div>

          {/* Question 4 */}
          <div>
            <p><strong>4. {t('faq.questions.4.question')}</strong></p>
            <p>{t('faq.questions.4.answer')}</p>
          </div>

          {/* Question 5 */}
          <div>
            <p><strong>5. {t('faq.questions.5.question')}</strong></p>
            <ul>
              <li>- {t('faq.questions.5.steps.0')}</li>
              <li>- {t('faq.questions.5.steps.1')}</li>
              <li>- {t('faq.questions.5.steps.2')}</li>
              <li>- {t('faq.questions.5.steps.3')}</li>
            </ul>
          </div>

          {/* Question 6 */}
          <div>
            <p><strong>6. {t('faq.questions.6.question')}</strong></p>
            <p>{t('faq.questions.6.answer')}</p>
          </div>

          {/* Question 7 */}
          <div>
            <p><strong>7. {t('faq.questions.7.question')}</strong></p>
            <p>{t('faq.questions.7.answer')}</p>
          </div>

          {/* Question 8 */}
          <div>
            <p><strong>8. {t('faq.questions.8.question')}</strong></p>
            <p>{t('faq.questions.8.answer')}</p>
          </div>

          {/* Question 9 */}
          <div>
            <p><strong>9. {t('faq.questions.9.question')}</strong></p>
            <p>{t('faq.questions.9.answer')}</p>
          </div>

          {/* Question 10 */}
          <div>
            <p><strong>10. {t('faq.questions.10.question')}</strong></p>
            <p>{t('faq.questions.10.answer')}</p>
          </div>

          {/* Question 11 */}
          <div>
            <p><strong>11. {t('faq.questions.11.question')}</strong></p>
            <p>{t('faq.questions.11.answer')}</p>
          </div>

          {/* Question 12 */}
          <div>
            <p><strong>12. {t('faq.questions.12.question')}</strong></p>
            <p>{t('faq.questions.12.answer')}</p>
          </div>

          {/* Question 13 */}
          <div className='pb-[32px]'>
            <p><strong>13. {t('faq.questions.13.question')}</strong></p>
            <p>{t('faq.questions.13.answer')}</p>
          </div>

          <div className='text-center pb-[52px]'>
            <p className='text-lg md:text-xl'><strong>{t('faq.conclusion')}</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}