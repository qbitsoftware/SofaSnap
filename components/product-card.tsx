"use client"

import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/utils/supabase/supabase.types'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
    product: Product
    className: string
}

export const ProductCard:React.FC<ProductCardProps> = ({product, className}) => {
    const router = useRouter();

    const handleClick = () => {
        // add logic here
        // router.push(`/${product.id}`)
    }


    return (
            <Card onClick={handleClick} className={cn("border-0 bg-transparent rounded-tr-[165px]", className)}>
                <CardContent className="relative flex aspect-square w-full h-full items-center justify-center p-6">
                    <Image
                        className="absolute rounded-tr-[165px]"
                        src={product.preview_image} alt={product.name}
                        fill
                        sizes="(max-width:1024px) 33vw, (max-width:2048px) 25vw"
                        style={{ objectFit: "cover" }}
                    />
                    <div className="flex absolute lg:h-[140px] z-10 w-full bottom-0 flex-col  bg-background p-[10px] justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <p>{product.name}</p>
                                <span className="flex" >5<Star className="w-8" color="" fill="#FE9F73" /></span>
                            </div>
                            <p className="text-lg font-normal">{product.description}</p>
                        </div>
                        <span className="text-lg font-semibold ">{product.price}€ päev</span>
                    </div>
                </CardContent>
            </Card>
    )
}
