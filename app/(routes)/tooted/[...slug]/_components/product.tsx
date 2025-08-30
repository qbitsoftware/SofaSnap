'use client'

import { ProductWithAddress } from '@/utils/supabase/supabase.types'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, StarIcon } from 'lucide-react'
import { addToFavoritesAction, removeFromFavoritesAction } from '@/app/actions'
import { User } from '@/utils/supabase/supabase.types'
import { ContactOwnerForm } from './contact-owner-form'
import { useRouter } from 'next/navigation'

interface ProductProps {
    product: ProductWithAddress
    user: User
}

export const ProductComponent: React.FC<ProductProps> = ({ product, user }) => {
    const [currentImage, setCurrentImage] = useState(0)
    const [isFavorite, setIsFavorite] = useState(product.favorite ? true : false)
    const router = useRouter()

    useEffect(() => {
        setIsFavorite(Boolean(product.favorite))
        setCurrentImage(0)
    }, [product.id, product.favorite])

    useEffect(() => {
        setIsFavorite(Boolean(product.favorite))
    }, [product.favorite])

    const handleDotClick = (index: number) => {
        setCurrentImage(index)
    }

    const handlePrev = () => {
        setCurrentImage((prev) => (prev - 1 + product.all_img!.length) % product.all_img!.length)
    }

    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % product.all_img!.length)
    }

    const handleToggleFavorite = async () => {
        const newFavoriteState = !isFavorite
        setIsFavorite(newFavoriteState)

        try {
            if (isFavorite) {
                await removeFromFavoritesAction(product.id, user.id)
            } else {
                await addToFavoritesAction(product.id, user.id)
            }
            router.refresh()
        } catch (error) {
            // Revert on error
            setIsFavorite(!newFavoriteState)
            console.error('Error toggling favorite:', error)
        }
    }

    return (
        <div className='flex flex-col md:flex-row gap-[40px] lg:gap-[100px] md:gap-[80px]'>
            <div className='relative'>
                <div className='mx-auto relative h-[250px] w-[260px] sm:h-[320px] sm:w-[330px] lg:w-[510px] lg:h-[450px] md:w-[350px] md:h-[309px] rounded-xl overflow-hidden'>
                    {(product.all_img ?? []).map((image, index) => (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            <Image
                                className='absolute w-full h-full rounded-xl object-contain'
                                src={image}
                                alt={product.name}
                                fill
                                sizes='(max-width: 1024) 48vw, (max-width: 1280px) 54vw, 60vw'
                                style={{ objectFit: "contain" }}
                                priority
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
                        {(product.all_img ?? []).map((_, index) => (
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
            <div className='flex-col justify-center md:justify-start md:gap-[28px] md:w-[40%] gap-4 flex p-4'>
                <div className='flex items-center justify-start gap-2'>
                    <button
                        onClick={handleToggleFavorite}
                        className={`p-2 rounded-full transition-colors 
                            ${isFavorite ? 'text-yellow-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500'}`}
                        aria-label={isFavorite ? 'Eemalda lemmikutest' : 'Lisa lemmikuks'}
                    >
                        <StarIcon
                            fill={isFavorite ? 'currentColor' : 'none'}
                            color={isFavorite ? 'currentColor' : 'black'}
                        />
                    </button>
                    <span className='text-muted-foreground'>{isFavorite ? 'Eemalda lemmikutest' : 'Lisa lemmikuks'}</span>
                </div>
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
                <div className='font-light text-md'>
                    <div className='flex'>
                        <p className='font-bold'>Materjal: <span className='font-light'>{product.material}</span></p>
                    </div>
                    <div>
                        <p className='font-bold'>Mõõtmed: <span className='font-light'>{`${product.length} x ${product.width} x ${product.heigth}`}</span></p>
                    </div>
                </div>
                <div className=''>
                    <p className='break-words overflow-wrap break-word whitespace-pre-line'>{product.description}</p>
                </div>
                <div className='mt-6'>
                    <ContactOwnerForm 
                        productId={product.id}
                        productName={product.name}
                        ownerUserId={product.user_id}
                    />
                </div>
            </div>
        </div >
    )
}
