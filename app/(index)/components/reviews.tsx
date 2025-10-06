"use client"
import { Review } from "@/types"
import { ReviewCarousel } from "./review-carousel"
import { useTranslation } from '@/lib/i18n/i18n-provider'

export const Reviews = () => {
  const { t } = useTranslation();

  const reviews: Review[] = [
    {
      id: 1,
      name: t('reviews.items.0.name'),
      image: '/images/profile.svg',
      rating: 5,
      text: t('reviews.items.0.text')
    },
    {
      id: 2,
      name: t('reviews.items.1.name'),
      image: '/images/profile.svg',
      rating: 4,
      text: t('reviews.items.1.text')
    },
    {
      id: 3,
      name: t('reviews.items.2.name'),
      image: '/images/profile.svg',
      rating: 5,
      text: t('reviews.items.2.text')
    }
  ]

  return (
    <div className="md:min-h-[600px] flex items-center relative">
      <ReviewCarousel Reviews={reviews} />
    </div>
  )
}