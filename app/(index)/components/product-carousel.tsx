import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { capitalize } from "@/utils/utils"
import { cn } from "@/lib/utils"
import { Product } from "@/types"
import { Star } from "lucide-react"

interface ProductCarouselProps {
  products: Product[] | null
  className: string
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, className }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={cn("md:max-w-[856px] w-[85%] lg:max-w-[1267px] xl:max-w-[1440px]", className)}
    >
      <CarouselContent className="items-center">
        {products && products.map((product, idx) => (
          <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3 ">
            <div className="p-1 flex justify-center">
              <Card className="border-0 bg-transparent rounded-tr-[165px] ">
                <CardContent className="relative flex xl:w-[312px] md:w-[265px] md:h-[410px] aspect-square items-center justify-center p-6">
                  <Image
                    className="absolute rounded-tr-[165px]"
                    src={product.image} alt={product.name}
                    fill
                    sizes="(max-width:1024px) 33vw, (max-width:2048px) 25vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="flex absolute lg:h-[140px] z-10 w-full bottom-0 flex-col  bg-background p-[10px] justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <p>{product.name}</p>
                        <span className="flex" >{product.rating}<Star className="w-8" color="" fill="#FE9F73" /></span>
                      </div>
                      <p className="text-lg font-normal">{product.description}</p>
                    </div>
                    <span className="text-lg font-semibold ">{product.price}€ päev</span>
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
