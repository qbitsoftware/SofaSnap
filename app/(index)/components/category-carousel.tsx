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

interface CategoryCarouselProps {
    Categories: Category[] | null
}

export const CategoryCarousel:React.FC<CategoryCarouselProps> = ({Categories}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="md:max-w-[856px] w-[85%] lg:max-w-[1267px] xl:max-w-[1440px]"
    >
      <CarouselContent className="items-center">
        {Categories && Categories.map((category) => (
          <CarouselItem key={category.name} className="md:basis-1/3 xl:basis-1/4 ">
            <div className="p-1 flex justify-center">
              <Card className="border-0 rounded-3xl bg-transparent">
                <CardContent className="relative flex lg:w-[255px] lg:h-[225px] md:w-[200px] md:h-[176px] aspect-square items-center justify-center p-6">
                    <Image className="absolute rounded-3xl" src={category.image} alt={category.name} fill objectFit="cover"/>
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
