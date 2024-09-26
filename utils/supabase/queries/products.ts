"use server"

import db from '@/utils/supabase/db'
import { category, category_join, product, productReal } from '@/utils/supabase/schema'
import { eq, and, sql } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { Category, CategoryJoin, CategoryTS, Product, ProductRealTS } from '../supabase.types'
import { TProductServer } from '@/lib/product-validation'

interface FetchProductsResponse {
    success: boolean;
    products: Product[];
    totalPages: number;
    message?: string;
}

export const fetchProductsByCategories = async (categories: string[], page: number): Promise<FetchProductsResponse> => {
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

export const fetchAllProducts = async () => {
    try {
        const result = await db.select().from(product)
        if (result.length == 0) {
            return {
                data: undefined,
                error: "No results found"
            }
        }

        return {
            data: result,
            error: undefined
        }
    } catch (error) {
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export const addProduct = async (prod: TProductServer) => {
    const product: ProductRealTS = {
        name: prod.name,
        description: prod.description!,
        user_id: prod.user_id,
        preview_image: prod.all_img[0],
        price: prod.price,
        width: prod.width,
        heigth: prod.heigth,
        length: prod.length,
        material: prod.material,
        type: prod.type,
        start_date: prod.start_date!,
        end_date: prod.end_date!,
        all_img: prod.all_img,

    }

    try {
        await db.transaction(async (tx) => {
            const insertedProduct = await tx.insert(productReal)
                .values(product)
                .returning({ id: productReal.id });

            const productId = insertedProduct[0]?.id;

            if (!productId) {
                throw new Error("Failed to insert product.");
            }

            const category: CategoryTS = {
                category_name: prod.category,
                product_id: productId,
            };

            await tx.insert(category_join)
                .values(category);
        });

        return {
            data: "Product and category successfully added",
            error: undefined,
        };
    } catch (error) {
        return {
            data: undefined,
            error: "Server error",
        };
    }
};

export const fetchProduct = async (id: number) => {
    try {
        const result = await db.select().from(product)
            .where(eq(product.id, id))
        if (result.length == 0) {
            return {
                data: undefined,
                error: "No results found"
            }
        }
        return {
            data: result,
            error: undefined
        }
    } catch (error) {
        return {
            data: undefined,
            error: "Server error"
        }
    }

}