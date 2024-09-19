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
import { ProductCard } from "@/components/product-card"

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
             <ProductCard product={product} className="xl:w-[312px] md:w-[265px] md:h-[410px]"/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
