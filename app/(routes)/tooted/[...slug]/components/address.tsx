import GoogleMapComponent from '@/components/map'
import { cn } from '@/lib/utils'
import { Address } from '@/utils/supabase/supabase.types'
import { MapPin } from 'lucide-react'
import React from 'react'

interface AddressProps {
    address: Address
    className: string
}

const AddressComponent: React.FC<AddressProps> = ({ address, className }) => {
    return (
        <>
            <div className={cn('px-6 md:px-[64px] h-[218px] md:h-[480px] max-w-[1440px] mx-auto md:mt-[200px]', className)}>
                <GoogleMapComponent api={process.env.GOOGLE_MAPS_KEY!} markers={[{ lat: address.location.y, lng: address.location.x }]} />
            </div>
            <div className='bg-[#CBD3CB]/35 md:h-[120px] mt-3'>
                <div className='h-full max-w-[1440px] px-[64px] mx-auto md:flex md:flex-col md:justify-center gap-1'>
                    <MapPin />
                    <p className='font-medium'>Asukoht kaardil</p>
                    <p className='font-normal'>{address.full_address}</p>
                </div>
            </div>
        </>

    )
}

export default AddressComponent