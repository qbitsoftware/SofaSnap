"use client"

import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Product } from '@/utils/supabase/supabase.types'
import { useTranslation } from '@/lib/i18n/i18n-provider'

interface ProductCardProps {
    product: Product
    className: string
    category?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className, category }) => {
    const { t } = useTranslation()

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
                        <div className="flex justify-between items-start text-base md:text-lg font-semibold gap-2">
                            <p className='leading-5 flex-1 overflow-hidden overflow-ellipsis line-clamp-2'>{product.name}</p>
                            {category && (
                                <span className="text-xs px-2 py-1 bg-accent/20 rounded-md text-foreground/70 capitalize whitespace-nowrap shrink-0">
                                    {category}
                                </span>
                            )}
                        </div>
                        <p className="hidden sm:block text-base md:[18px] md:leading-6 xl:leading-7 font-normal max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                            {product.description && product.description.length > 30
                                ? `${product.description.substring(0, 30)}...`
                                : product.description}
                        </p>
                    </div>
                    <span className="text-sm md:text-lg font-semibold ">{product.price}€ {product.type == "rent" ? t('products.perDay') : ""}</span>
                </div>
            </CardContent>
        </Card>
    )
}
