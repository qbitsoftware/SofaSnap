import { Product } from '@/utils/supabase/supabase.types'
import { ProductCarousel } from './product-carousel'

interface ProductProps {
    data: Product[] | undefined
    error: string | undefined
}

export const RecentProducts: React.FC<ProductProps> = ({ error, data }) => {
    return (
        <div className='relative min-h-[400px] md:h-[645px] bg-background w-full flex flex-col items-center justify-center py-8 md:py-0'>
            <h2 className='text-3xl md:text-5xl font-medium w-[90%] max-w-[1360px] mx-auto text-left mb-6 md:mb-10'>Viimati vaadatud</h2>
            {!error && data
                ? <ProductCarousel className='w-[90%]' products={data}  />
                : <div className="w-full text-center text-gray-500">No products available</div>
            }
        </div>
    )
}
