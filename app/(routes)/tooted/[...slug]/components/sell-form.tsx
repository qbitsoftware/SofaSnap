"use client"

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Product } from '@/utils/supabase/supabase.types'
import { round } from '@/utils/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface SellFormProps {
    product: Product
}

export const SellForm: React.FC<SellFormProps> = ({ product }) => {

    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    console.log(isMobile)


    const fee = round(product.price * 0.05)
    const total = round(product.price + fee)
    return (
        <div>
            <div className="bg-[#ebeeeb] hidden px-6 md:px-0 w-full md:w-[90%] rounded-xl mx-auto max-w-[1160px] md:flex flex-col md:flex-row">
                <div className="hidden lg:block w-full md:w-[400px] drop-shadow-md">
                    <Image
                        src={"/images/tool2.png"}
                        alt={product.name}
                        width={466}
                        height={500}
                        objectFit="contain"
                        className="my-6 mx-auto md:mx-10 rounded-lg"
                    />
                </div>
                <div className="my-12 w-full flex flex-col md:w-auto mx-auto">
                    <div className="md:flex mt-2">
                        <div className="py-1 border-black/25 md:w-[220px] rounded-r-none flex items-center justify-left pl-4 border-[1px] rounded-sm">
                            <p>{product.name}</p>
                        </div>
                        <div className="py-1 border-black/25 md:w-[180px] rounded-l-none border-l-0 flex items-center justify-left pl-4 border-[1px] rounded-sm">
                            <p>{"Kogus: 1"}</p>
                        </div>
                    </div>
                    <div className="md:mt-6 md:flex md:flex-col gap-4">
                        <div className="md:flex justify-between">
                            <p>Toote hind</p>
                            <div>{product.price}€</div>
                        </div>
                        <div className="md:flex justify-between">
                            <div>SofaSnapi teenustasu</div>
                            <div>{fee}€</div>
                        </div>
                        <Separator className="bg-black/25" />
                        <div className="md:flex md:justify-between">
                            <div>
                                Kokku
                            </div>
                            <div>
                                {total}€
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="mt-8 w-full rounded-full bg-accent text-black">Osta</Button>
                </div>
            </div>
                {isMobile && (
                    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-gray-200 p-4 flex justify-between items-center">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold">{product.price}€</span>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="rounded-2xl bg-accent text-black px-6 py-6 flex items-center"

                        >
                            Osta
                        </Button>
                    </div>
                )}
        </div >
    )
}
