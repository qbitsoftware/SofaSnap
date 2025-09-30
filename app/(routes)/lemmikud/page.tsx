import { GetUserInfo } from "@/app/actions"
import { getFavoriteProducts } from "@/utils/supabase/queries/favorite"
import { FavoriteProduct } from "./_components/favourite"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function FavoritesPage() {
  const user = await GetUserInfo()

  if (!user.data.user) {
    redirect("/login")
  }

  const favoriteProducts = await getFavoriteProducts(user.data.user?.id as string)

  if (!favoriteProducts || favoriteProducts.length === 0) {
    return (
      <div className='w-full md:px-[64px] max-w-[1440px] md:mx-auto px-6'>
        <h1 className='md:text-5xl text-3xl text-center font-semibold md:mt-[100px]'>Sinu lemmiktooted puuduvad</h1>
        <div className='flex flex-col gap-4 mx-auto justify-center items-center mt-10'>
          <Link href={"/tooted"} className='w-full max-w-[640px]'>
            <Button className='py-6  w-full bg-accent text-black mx-auto'>Vaata tooteid</Button>
          </Link>
          <Link href={"/"} className='w-full max-w-[640px]'>
            <Button className='py-6  w-full bg-secondary mx-auto'>Mine kodulehele</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full md:px-[64px] max-w-[1440px] md:mx-auto px-6'>
      <div className='mb-8'>
        <h1 className='md:text-4xl text-2xl font-semibold mb-2'>Teie lemmiktooted</h1>
        <p className='text-muted-foreground'>Teil on {favoriteProducts.length} lemmikut</p>
      </div>
      
      <div className='grid gap-6'>
        {favoriteProducts.map(product => (
          <FavoriteProduct
            key={product.id}
            product={product}
            user_id={user.data.user?.id as string} />
        ))}
      </div>
    </div>
  )
}