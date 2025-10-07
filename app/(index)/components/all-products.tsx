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
        <div className="mt-[100px] mb-[100px] px-6 max-w-[1440px] mx-auto">

            <div
                className="md:min-h-[400px] lg:min-h-[520px] xl:min-h-[650px] max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            >
                {products && products.map((product, idx) => (
                    <div
                        key={idx}
                        className='flex justify-center items-center'
                        onClick={() => router.push(`/tooted/${product.id}`)} onMouseEnter={() => router.prefetch(`/tooted/${product.id}`)}>
                        <ProductCard product={product} className="w-full max-w-[320px] h-[280px] md:h-[320px] lg:h-[350px]" />
                    </div>
                ))}
            </div>

        </div>
    )
}
