"use client"

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Reviews } from '@/utils/supabase/queries/products'
import { MessageSquare, Star } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ReviewsProps {
    reviews: Reviews[] | undefined
    className: string
}

export const ReviewsComp: React.FC<ReviewsProps> = ({ reviews, className }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    const displayedReviews = reviews && isSmallScreen ? reviews.slice(0, 3) : reviews

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])


    if (!reviews || reviews.length === 0) {
        return (
            // <Card className={cn("w-full max-w-[1000px] bg-[#ebeeeb]", className)}>
            <div className=''>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-6">
                        <MessageSquare className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2">Tootel pole hinnanguid</CardTitle>
                    <CardDescription className="max-w-[500px] mb-6">
                        Ole esimene, kes jagab oma kogemust! Sinu tagasiside aitab teistel teha teadlikke otsuseid ja aitab meil oma teenust paremaks muuta.
                    </CardDescription>
                </CardContent>
            </div>
            // </Card>
        )
    }

    return (
        <div className={cn("md:flex justify-between md:min-h-[180px] w-full max-w-[1000px]", className)}>
            {displayedReviews && displayedReviews.map((review, idx) => (
                <div key={idx} className="md:max-w-[180px] md:flex md:flex-col gap-2">
                    <div className="md:flex items-center gap-4">
                        <Image src="/images/profiil-must.svg" alt="avatar" width={68} height={68} />
                        <p className="font-bold">Tüütu kasutaja</p>
                    </div>
                    <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-6 h-6 ${i < review.reviews.rating ? 'text-transparent fill-[#FE9F73]' : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <div>
                        <p className="font-normal">{review.reviews.feedback}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
