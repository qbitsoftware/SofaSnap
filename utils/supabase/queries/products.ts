"use server"

import db from '@/utils/supabase/db'
import { category, category_join, product } from '@/utils/supabase/schema'
import { eq, and, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { Product } from '../supabase.types'

interface FetchProductsResponse {
    success: boolean;
    products: Product[];
    totalPages: number;
    message?: string;
}

const fetchProducts = async (categories: string[], page: number): Promise<FetchProductsResponse> => {
    const categoryJoinAlias = alias(category_join, 'cj2');

    try {
        let query = db
            .select({
                id: category_join.product_id,
                name: product.name,
                created_at: product.created_at,
                updatedAt: product.updatedAt,
                condition: product.condition,
                description: product.description,
                user_id: product.user_id,
                preview_image: product.preview_image,
                price: product.price,
                rating: product.rating,
            })
            .from(category_join)
            .innerJoin(category, eq(category.name, category_join.category_name))
            .innerJoin(product, eq(product.id, category_join.product_id));

        if (categories.length > 1) {
            // @ts-ignore
            query = query
                .innerJoin(categoryJoinAlias, eq(category_join.product_id, categoryJoinAlias.product_id))
                .where(
                    and(
                        eq(category_join.category_name, categories[0]),
                        eq(categoryJoinAlias.category_name, categories[1])
                    )
                );
        } else {
            // @ts-ignore
            query = query
                .where(eq(category_join.category_name, categories[0]));
        }

        const result = await query
            .limit(12)
            .offset((page - 1) * 12);

        let countQuery = db
            .select({ count: sql`count(*)`.mapWith(Number) })
            .from(category_join)
            .innerJoin(product, eq(product.id, category_join.product_id));

        if (categories.length > 1) {
            // @ts-ignore
            countQuery = countQuery
                .innerJoin(categoryJoinAlias, eq(category_join.product_id, categoryJoinAlias.product_id))
                .where(
                    and(
                        eq(category_join.category_name, categories[0]),
                        eq(categoryJoinAlias.category_name, categories[1])
                    )
                );
        } else {
            // @ts-ignore
            countQuery = countQuery
                .where(eq(category_join.category_name, categories[0]));
        }

        const countResult = await countQuery;
        const totalCount = countResult[0]?.count || 0;
        const totalPages = Math.ceil(totalCount / 12);

        return {
            success: true,
            products: result,
            totalPages,
            message: "",
        };
} catch (error) {
    console.error("Error fetching products:", error);
    return {
        products: [],
        totalPages: 0,
        success: false,
        message: "Failed to fetch products.",
    };
}
};

export default fetchProducts;
