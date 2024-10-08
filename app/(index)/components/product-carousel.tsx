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
      className={cn("w-full max-w-[90%] md:max-w-[856px] lg:max-w-[1267px] xl:max-w-[1440px]", className)}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {products && products.map((product) => (
          <CarouselItem key={value + product.name} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
            <div onClick={() => router.push(`/tooted/${product.id}`)} className="p-1 flex justify-center">
              <ProductCard product={product} className="w-full max-w-[312px] h-[350px] md:h-[410px]" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  ) 
}
