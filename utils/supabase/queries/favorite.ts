import { favorite, product } from "../schema"
import db from "../db"
import { and, eq } from "drizzle-orm"
import { Favorite, Product } from "../supabase.types"

export const addFavorite = async (product_id: number, user_id: string): Promise<Favorite | undefined> => {
    try {
    const [newFavorite] = await db.insert(favorite).values({
        product_id: product_id,
        user_id: user_id
    }).returning()

        return newFavorite
    } catch (error) {
        console.error('Error adding favorite:', error)
        return undefined
    }
}

export const removeFavorite = async (product_id: number, user_id: string): Promise<Favorite | undefined> => {
    try {
        const [removedFavorite] = await db.delete(favorite).where(and(eq(favorite.product_id, product_id), eq(favorite.user_id, user_id))).returning()
        return removedFavorite
    } catch (error) {
        console.error('Error removing favorite:', error)
        return undefined
    }
}

export const getFavoriteProducts = async (user_id: string): Promise<Product[]> => {
    try {
        if (!user_id) {
            return []
        }

        const favoritesProducts = await db.select().from(favorite).innerJoin(product, eq(favorite.product_id, product.id)).where(eq(favorite.user_id, user_id))
        
        const products: Product[] = favoritesProducts.map(item => item.products)
        
        return products
    } catch (error) {
        console.error('Error fetching favorites:', error)
        return []
    }
}