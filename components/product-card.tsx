"use client"

import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/utils/supabase/supabase.types'

interface ProductCardProps {
    product: Product
    className: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {

    return (
        <Card className={cn("border-0 p-0 bg-transparent rounded-tr-[76px] md:rounded-tr-[155px] hover:cursor-pointer  drop-shadow-md", className)}>
            <CardContent className="p-0 flex w-full h-full aspect-square items-center justify-center flex-col">
                <div className='relative w-full h-[62%]'>
                    <Image
                        className="absolute rounded-tr-[76px] md:rounded-tr-[155px] w-full h-full"
                        src={product.preview_image} alt={product.name}
                        fill
                        sizes="(max-width:1024px) 33vw, (max-width:2048px) 25vw"
                        style={{ objectFit: "cover" }}
                    />
                </div>
                <div className="flex h-[38%] flex-shrink-0 z-10 w-full bottom-0 flex-col bg-background p-[10px] justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center text-base md:text-lg font-semibold">
                            <p className='leading-5 max-w-[80%] whitespace-nowrap md:whitespace-normal overflow-hidden overflow-ellipsis'>{product.name}</p>
                            <span className="flex">5<Star className="w-8" color="" fill="#FE9F73" /></span>
                        </div>
                        <p className="hidden sm:block text-base md:[18px] md:leading-6 xl:leading-7 font-normal max-h-[50px] xl:max-h-[60px] md:max-h-[50px] max-w-[100%] overflow-hidden overflow-ellipsis">{product.description}</p>
                    </div>
                    <span className="text-sm md:text-lg font-semibold ">{product.price}€ {product.type == "rent" ? "päev" : ""}</span>
                </div>
            </CardContent>
        </Card>
    )
}
