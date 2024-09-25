'use client'

import { Product } from '@/utils/supabase/supabase.types'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductProps {
    product: Product
}

export const ProductComponent: React.FC<ProductProps> = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(0)

    // ajutine

    let images = [product.preview_image, "/images/leht.svg", product.preview_image]


    const handleDotClick = (index: number) => {
        setCurrentImage(index)
    }

    const handlePrev = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % images.length)
    }

    return (
        <div className='md:flex lg:gap-[130px] md:gap-[80px] 2xl:gap-[260px]'>
            <div className='relative'>
                <div className='relative lg:w-[510px] lg:h-[450px] md:w-[350px] md:h-[309px] rounded-xl overflow-hidden'>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            <Image
                                className='absolute w-full h-full rounded-xl object-cover'
                                src={image}  // Assuming 'image' is the URL
                                alt={product.name}
                                fill
                                objectFit='cover'
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrev}
                        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        aria-label="Previous review"
                    >
                        <ChevronLeft size={40} className="" />
                    </button>
                    <div className="flex space-x-2 mx-4">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 ${index === currentImage ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to review ${index + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleNext}
                        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        aria-label="Next review"
                    >
                        <ChevronRight size={40} />
                    </button>
                </div>
            </div>
            <div className='md:flex-col md:gap-[28px] flex'>
                <h1 className='md:text-4xl font-semibold'>{product.name}</h1>
                <div className='bg-accent py-2 inline-block px-3 rounded-full w-max'>
                    <p className='font-semibold text-lg'>
                        {product.price}
                        <span>€</span>
                        <span className='font-normal pl-4'>Päev</span>
                    </p>
                </div>
                <div>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    )
}
