import { Product } from '@/utils/supabase/supabase.types'
import { ProductCarousel } from './product-carousel'
import { fetchAllProducts } from '@/utils/supabase/queries/products'

interface ProductProps {
    data: Product[] | undefined
    error: string | undefined
}

export const RecentProducts:React.FC<ProductProps> = ({error,data}) => {
    return (
        <div className='relative md:h-[645px] bg-background w-full flex gap-10 md:flex-col items-center justify-center'>
            <h2 className='md:text-5xl font-medium max-w-[1360px] mx-auto w-[80%] xl:w-[83%] 2xl:w-[80%] text-left'>Viimati vaadatud</h2>
            {!error && data
                ? <ProductCarousel className='' products={data} />
                : <div></div>
            }
        </div>
    )
}
