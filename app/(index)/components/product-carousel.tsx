"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"
import { Product } from "@/utils/supabase/supabase.types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface ProductCarouselProps {
  products: Product[] | null
  className: string
  value: string
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products, className, value }) => {
  const router = useRouter()


  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={cn("md:max-w-[856px] w-[85%] lg:max-w-[1267px] xl:max-w-[1440px]", className)}
    >
      <CarouselContent className="items-center">
        {products && products.map((product, idx) => (
          <CarouselItem key={value + product.name} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3 drop-shadow-sm">
            <div onClick={() => router.push(`/tooted/${product.id}`)} className="p-1 flex justify-center">
            <ProductCard product={product}  className="xl:w-[312px] md:w-[265px] md:h-[410px]" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
