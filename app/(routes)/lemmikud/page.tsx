import { GetUserInfo } from "@/app/actions"
import { getFavoriteProducts } from "@/utils/supabase/queries/favorite"
import { FavoriteProduct } from "./_components/favourite"
import { redirect } from "next/navigation"
import Hero from "./_components/hero"
import { TranslatedEmptyPage } from "./_components/translated-empty"

export default async function FavoritesPage() {
  const user = await GetUserInfo()

  if (!user.data.user) {
    redirect("/login")
  }

  const favoriteProducts = await getFavoriteProducts(user.data.user?.id as string)

  if (!favoriteProducts || favoriteProducts.length === 0) {
    return (
      <TranslatedEmptyPage />
    )
  }

  return (
    <div className='w-full md:px-[64px] max-w-[1440px] md:mx-auto px-6'>
      <Hero favProductsCount={favoriteProducts.length} />

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
