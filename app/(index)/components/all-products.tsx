"use client"
import { ProductCard } from "@/components/product-card"
import { Product } from "@/utils/supabase/supabase.types"
import { useRouter } from "next/navigation"

interface Props {
    products: Product[] | undefined
}
export function AllProducts({ products }: Props) {
    const router = useRouter()
    return (
        <div className="mt-[100px] mb-[100px]">

            <div
                className="md:min-h-[470px] lg:min-h-[650px] xl:min-h-[810px] max-w-[1440px] mx-auto grid grid-cols-2 justify-between xl:gap-x-[30px] lg:grid-cols-3 xl:grid-cols-3 md:gap-y-[30px] gap-y-[15px] gap-x-[8px] px-4 md:px-0"
            >
                {products && products.map((product, idx) => (
                    <div
                        key={idx}
                        className='flex justify-center items-center'
                        onClick={() => router.push(`/tooted/${product.id}`)} onMouseEnter={() => router.prefetch(`/tooted/${product.id}`)}>
                        <ProductCard product={product} className="w-full max-w-[450px] h-[400px] md:h-[480px]" />
                    </div>
                ))}
            </div>

        </div>
    )
}
