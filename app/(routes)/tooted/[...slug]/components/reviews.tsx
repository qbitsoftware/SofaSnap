"use client"

import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface ReviewsProps {
    reviews: {
        name: string
        rating: number
        feedback: string
    }[]
    className: string
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, className }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const displayedReviews = isSmallScreen ? reviews.slice(0, 3) : reviews;
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [displayedReviews]);


    return (
        <div className={cn("md:flex justify-between md:min-h-[180px] w-full max-w-[1000px]", className)}>
            {displayedReviews.map((review, idx) => (
                <div key={idx} className='md:max-w-[180px] md:flex md:flex-col gap-2'>
                    <div className='md:flex items-center gap-4'>
                        <Image src={"/images/profiil-must.svg"} alt='avatar' width={68} height={68} />
                        <p className='font-bold'>{"Marje"}</p>
                    </div>
                    <div className="flex gap-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <div>
                        <p className='font-normal'>
                            {review.feedback}
                        </p>
                    </div>
                </div>
            ))}
        </div>

    )
}
