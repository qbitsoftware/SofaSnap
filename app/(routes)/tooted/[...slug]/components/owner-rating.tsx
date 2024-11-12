import { Button } from '@/components/ui/button'
import { User } from '@/utils/supabase/supabase.types'
import {  StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface OwnerRatingProps {
    owner: User
}

export const OwnerRating: React.FC<OwnerRatingProps> = ({ owner }) => {
    return (
        <div className='md:flex md:flex-col'>
            <div className='flex items-center gap-2'>
                <Image src={"/images/profiil-must.svg"} alt='avatar' width={42} height={42} />
                <p className='font-bold'>{"Marje"}</p>
                <div className="flex ">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon
                            key={i}
                            className={`w-6 h-6 ${i < 4 ? 'text-transparent fill-[#FE9F73]' : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
            <div>
                <Link className='pl-[48px]' href="">
                    <Button className='p-0 m-0 h-0 text-secondary' variant={"link"}>
                        Vaata sama rentija teisi tooteid
                    </Button>
                </Link>
            </div>
        </div>
    )
}
