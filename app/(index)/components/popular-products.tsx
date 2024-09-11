import { ProductCarousel } from "./product-carousel"

 const products = [
    {
        id: "1",
        name: "Product 1",
        description: "This is a description for Product 1",
        price: 19.99,
        rating: 4.5,
        image: "https://wzsyfikztrtmbdaebxtf.supabase.co/storage/v1/object/public/resources/categories/elutuba.png",
    },
    {
        id: "1",
        name: "Product 1",
        description: "This is a description for Product 1",
        price: 19.99,
        rating: 4.5,
        image: "https://wzsyfikztrtmbdaebxtf.supabase.co/storage/v1/object/public/resources/categories/elutuba.png",
    },
    {
        id: "1",
        name: "Product 1",
        description: "This is a description for Product 1",
        price: 19.99,
        rating: 4.5,
        image: "https://wzsyfikztrtmbdaebxtf.supabase.co/storage/v1/object/public/resources/categories/elutuba.png",
    },
    {
        id: "1",
        name: "Product 1",
        description: "This is a description for Product 1",
        price: 19.99,
        rating: 4.5,
        image: "https://wzsyfikztrtmbdaebxtf.supabase.co/storage/v1/object/public/resources/categories/elutuba.png",
    },
    {
        id: "1",
        name: "Product 1",
        description: "This is a description for Product 1",
        price: 19.99,
        rating: 4.5,
        image: "https://wzsyfikztrtmbdaebxtf.supabase.co/storage/v1/object/public/resources/categories/elutuba.png",
    },
    {
        id: "1",
        name: "Product 1",
        description: "This is a description for Product 1",
        price: 19.99,
        rating: 4.5,
        image: "https://wzsyfikztrtmbdaebxtf.supabase.co/storage/v1/object/public/resources/categories/elutuba.png",
    },
]


export const PopularProducts = () => {
    return (
        <div className='relative md:h-[645px] bg-background w-full flex gap-10 md:flex-col items-center justify-center'>
            <h2 className='md:text-5xl font-medium max-w-[1360px] mx-auto w-[80%] xl:w-[83%] 2xl:w-[80%] text-left'>Populaarsemad tooted</h2>
            <ProductCarousel className='' products={products} />
        </div>
    )
}