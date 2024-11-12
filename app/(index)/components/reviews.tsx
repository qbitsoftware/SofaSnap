import { Review } from "@/types"
import { ReviewCarousel } from "./review-carousel"

const reviews: Review[] = [
  {
    id: 1,
    name: 'Kristjan',
    image: '/images/profile.svg',
    rating: 5,
    text: 'Väga meelldiv suhtlus ja heas korras mööbel.'
  },
  {
    id: 2,
    name: 'Kaisa',
    image: '/images/profile.svg',
    rating: 4,
    text: 'Suurepärane teenus – platvorm pakub stiilset mööblit nii rentimiseks kui ka ostmiseks'
  },
  {
    id: 3,
    name: 'Jüri',
    image: '/images/profile.svg',
    rating: 5,
    text: 'Mugav ja usaldusväärne viis kiiresti kvaliteetset mööblit leida ja seda eelarvesõbralikult kasutada.'
  }
]



export const Reviews = () => {
  return (
    <div className="md:min-h-[600px] flex items-center relative">
      <ReviewCarousel Reviews={reviews} />
    </div>
  )
}