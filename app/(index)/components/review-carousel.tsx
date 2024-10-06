'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Review } from '@/types'

interface ReviewProps {
  Reviews: Review[]
}

export const ReviewCarousel: React.FC<ReviewProps> = ({ Reviews }) => {
  const [currentReview, setCurrentReview] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % Reviews.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [Reviews.length])

  const handleDotClick = (index: number) => {
    setCurrentReview(index)
  }

  const handlePrev = () => {
    setCurrentReview((prev) => (prev - 1 + Reviews.length) % Reviews.length)
  }

  const handleNext = () => {
    setCurrentReview((prev) => (prev + 1) % Reviews.length)
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      <Card className="overflow-hidden bg-background drop-shadow-md">
        <CardContent className="p-6">
          <div className="relative h-[300px]">
            {Reviews.map((review, index) => (
              <div
                key={review.id}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentReview ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <div className="flex flex-col items-center text-center">
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={0}
                    height={0}
                    style={{ width: '100px', height: 'auto' }}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex space-x-2 mx-4">
          {Reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 ${index === currentReview ? 'bg-primary' : 'bg-gray-300'
                }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          aria-label="Next review"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

