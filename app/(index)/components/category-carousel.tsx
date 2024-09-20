'use client'

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Category } from "@/types"
import Image from "next/image"
import { capitalize } from "@/utils/utils"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface CategoryCarouselProps {
  Categories: Category[] | null
  className: string
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ Categories, className }) => {

  const router = useRouter()


  // const handleClick = () => {

  // }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={cn("md:max-w-[856px] w-[85%] lg:max-w-[1267px] xl:max-w-[1440px]", className)}
    >
      <CarouselContent className="items-center">
        {Categories && Categories.map((category) => (
          <CarouselItem key={category.name} className="md:basis-1/3 xl:basis-1/4 ">
            <div className="p-1 flex justify-center">
              <Card onClick={() => router.push(`/tooted/${category.name}`)} className="border-0 rounded-3xl bg-transparent hover:cursor-pointer">
                <CardContent className="relative flex lg:w-[255px] lg:h-[225px] md:w-[200px] md:h-[176px] aspect-square items-center justify-center p-6">
                  <Image className="absolute rounded-3xl" style={{ objectFit: "cover" }} src={category.image} alt={category.name} sizes="(max-width: 1024px) 200px, 255px" fill />
                  <div className="flex absolute lg:h-20 md:h-16 backdrop-blur-md bg-background/40 z-10 w-full bottom-0 rounded-b-3xl items-center justify-center">
                    <span className="text-lg font-medium">{capitalize(category.name)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
