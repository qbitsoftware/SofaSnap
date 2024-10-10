import { Review } from "@/types"
import { ReviewCarousel } from "./review-carousel"

const reviews: Review[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      image: '/images/profile.svg',
      rating: 5,
      text: 'Absolutely love this product! It exceeded all my expectations and has become an essential part of my daily routine.'
    },
    {
      id: 2,
      name: 'Bob Smith',
      image: '/images/profile.svg',
      rating: 4,
      text: 'Great value for money. While there\'s room for minor improvements, overall it\'s a solid choice that I would recommend.'
    },
    {
      id: 3,
      name: 'Carol Davis',
      image: '/images/profile.svg',
      rating: 5,
      text: 'Outstanding customer service! The team went above and beyond to ensure my satisfaction. Will definitely be a returning customer.'
    }
  ]
  
  

export const Reviews = () => {
    return (
        <div className="md:min-h-[600px] flex items-center relative">
            <ReviewCarousel Reviews={reviews}/>
        </div>
    )
}