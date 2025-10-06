"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MontserratAlternates } from '@/fonts'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { SearchButton } from './search-button'
import Link from 'next/link'
import { Product } from '@/utils/supabase/supabase.types'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/i18n-provider'

interface Props {
    products: Product[] | undefined
}

export const LandingPage = ({ products }: Props) => {
    const { t } = useTranslation();
    const [inputValue, setInputValue] = useState<string>('');
    const [filteredSuggestions, setFilteredSuggestions] = useState<Product[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number>(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    const router = useRouter()


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length > 0 && products) {

            const filtered = products.filter(
                (product) => product.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }

        setSelectedSuggestionIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedSuggestionIndex((prev) =>
                prev < filteredSuggestions.length - 1 ? prev + 1 : prev
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter' && selectedSuggestionIndex > -1) {
            setInputValue(filteredSuggestions[selectedSuggestionIndex].name);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (product: Product) => {
        setInputValue(product.name);
        setShowSuggestions(false);
        inputRef.current?.focus();
        router.push("/tooted/" + product.id)
    };

    return (
        <div className='w-full md:min-h-[470px] lg:min-h-[650px] xl:min-h-[810px] max-w-[1440px] mx-auto mb-[30px] px-4 md:px-0'>
            <div className='flex flex-col md:flex-row md:justify-between w-full'>
                <div className="md:ml-16 flex md:flex flex-col md:items-start mt-[20px] md:mt-[83px]">
                    <div className='md:relative md:h-[150px] lg:h-[250px]'>
                        <h1 className={cn('hidden md:block md:text-4xl lg:text-6xl md:w-[50vw] md:max-w-[553px] h-full font-semibold absolute z-10 text-start', MontserratAlternates.className)}>{t('landing.hero.title')}<br className='lg:hidden' /> </h1>
                        <h1 className={cn('md:hidden text-center text-2xl sm:text-4xl font-semibold', MontserratAlternates.className)}>{t('landing.hero.title')}</h1>
                    </div>
                    <Link className='mx-auto z-10' href={"/tooted"} >
                        <Button className='bg-accent text-foreground hover:bg-accent/90 rounded-full w-[200px] h-[50px] md:w-[180px] md:h-[60px] mt-5 md:mt-0 font-semibold text-base shadow-md hover:shadow-lg transition-all'>
                            {t('landing.hero.cta')}
                        </Button>
                    </Link>
                </div>
                <div className='hidden relative aspect-[1.47/1]  md:w-[48vw] lg:w-[54vw] xl:w-[60vw] xl:mr-20 md:flex justify-self-end max-w-[821px]'>
                    <Image className='absolute w-full h-full' src={"/images/landing.png"} alt="furniture" fill sizes='(max-width: 1024) 48vw, (max-width: 1280px) 54vw, 60vw' priority />
                </div>
                <div className='relative md:hidden aspect-[375/189] mt-[-60px]'>
                    <Image className='absolute' src={"/images/Käed.svg"} alt="kaed" fill />
                </div>
            </div>
            <div className='md:block hidden md:w-[523px] md:ml-16 relative mt-[26px]'>
                <Search className='absolute left-5 xl:top-[20px] top-[14px]' color='white' />
                <SearchButton />
                {/* <Input className='md:w-[523px] bg-[#5C6D72]/30 rounded-full md:h-[53px] xl:h-[65px] text-background px-[60px] text-xl' /> */}
                <Input
                    ref={inputRef}
                    className='md:w-[523px] bg-[#5C6D72]/30 rounded-full md:h-[53px] xl:h-[65px] text-background px-[60px] text-xl'
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(inputValue.length > 0)}
                />
                {showSuggestions && (
                    <ul
                        ref={suggestionsRef}
                        className="absolute z-10 w-full mt-2 bg-[#5C6D72]/70 rounded-xl shadow-lg max-h-60 overflow-auto"
                    >
                        {filteredSuggestions.map((product, index) => (
                            <li
                                key={index}
                                className={`px-4 py-2 cursor-pointer text-background hover:bg-[#5C6D72] ${index === selectedSuggestionIndex ? 'bg-[#5C6D72]' : ''
                                    }`}
                                onClick={() => handleSuggestionClick(product)}
                                onMouseEnter={() => {
                                    router.prefetch(`/tooted/${product.id}`)
                                }}
                            >
                                <div className='flex justify-between'>
                                    <p>{product.type == "sell" ? t('products.sale') : t('products.rent')}: {product.name}</p>
                                    <p>{product.price}€</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
