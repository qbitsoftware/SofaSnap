import { Button } from '@/components/ui/button'
import { User } from '@/utils/supabase/supabase.types'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


interface OwnerRatingProps {
    owner: User
}

export const OwnerRating: React.FC<OwnerRatingProps> = ({ owner }) => {
    // Replace hard coded stuff
    return (
        <div className='md:flex md:flex-col'>
            <div className='flex items-center gap-2'>
                <Image src={"/images/profiil-must.svg"} alt='avatar' width={42} height={42} />
                <p className='font-bold'>{"Marje"}</p>
                <div className="flex ">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
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
