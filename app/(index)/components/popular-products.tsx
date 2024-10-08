import { ProductCarousel } from "./product-carousel"
import { Product } from "@/utils/supabase/supabase.types"

interface ProductProps {
    data: Product[] | undefined
    error: string | undefined
}

export const PopularProducts: React.FC<ProductProps> = ({ data, error }) => {
    return (
        <div className='relative md:h-[645px] bg-background w-full flex gap-10 flex-col items-center justify-center'>
            <h2 className='text-3xl md:text-5xl font-medium max-w-[1360px] mx-auto w-[80%] xl:w-[83%] 2xl:w-[80%] text-left'>Populaarsemad tooted</h2>
            {!error && data
                ? <ProductCarousel className='w-[90%]' products={data} value={"2"} />
                : <div></div>
            }
        </div>
    )
}