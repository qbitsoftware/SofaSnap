'use client'

import { Product } from '@/utils/supabase/supabase.types'
import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductProps {
    product: Product
}

export const ProductComponent: React.FC<ProductProps> = ({ product }) => {
    const [currentImage, setCurrentImage] = useState(0)



    const handleDotClick = (index: number) => {
        setCurrentImage(index)
    }

    const handlePrev = () => {
        setCurrentImage((prev) => (prev - 1 + product.all_img!.length) % product.all_img!.length)
    }

    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % product.all_img!.length)
    }

    return (
        <div className='flex flex-col md:flex-row gap-[40px] lg:gap-[100px] md:gap-[80px] '>
            <div className='relative'>
                <div className='mx-auto relative h-[250px] w-[260px] sm:h-[320px] sm:w-[330px] lg:w-[510px] lg:h-[450px] md:w-[350px] md:h-[309px] rounded-xl overflow-hidden'>
                    {product.all_img!.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            <Image
                                className='absolute w-full h-full rounded-xl object-cover'
                                src={image}
                                alt={product.name}
                                fill
                                objectFit='cover'
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between items-center mt-4 md:max-w-[100%] max-w-[70%] mx-auto">
                    <button
                        onClick={handlePrev}
                        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        aria-label="Previous review"
                    >
                        <ChevronLeft strokeWidth={1} size={40} className="" />
                    </button>
                    <div className="flex space-x-2 mx-4">
                        {product.all_img!.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-2 h-2 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 ${index === currentImage ? 'bg-primary' : 'bg-gray-300'
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
                        <ChevronRight strokeWidth={1} size={40} />
                    </button>
                </div>
            </div>
            <div className='flex-col justify-center md:justify-start md:gap-[28px] md:w-[40%] gap-4 flex'>
                <div className='flex md:items-start flex-wrap xl:flex-row gap-4 items-center'>
                    <h1 className='md:text-4xl text-[20px] xl:max-w-[60%] font-medium md:font-semibold m-0 p-0'>{product.name}</h1>
                    <div className='bg-accent py-2 flex items-center max-h-[40px] px-3 rounded-full'>
                        <p className='text-[14px] font-semibold md:text-lg flex'>
                            {product.price}
                            <span className=''>€</span>
                            {product.type == "rent" && <span className='font-normal pl-2 md:pl-4'>Päev</span>}
                        </p>
                    </div>
                </div>
                <div className=''>
                    <p className='break-words overflow-wrap break-word whitespace-pre-line'>{product.description}</p>
                </div>
            </div>
        </div>
    )
}
