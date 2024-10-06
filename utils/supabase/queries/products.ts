import db from '@/utils/supabase/db'
import { category, category_join, product, address, address_join_product } from '@/utils/supabase/schema'
import { eq, and, sql, desc } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { AddressJoinProductTS, AddressTS, CategoryJoin, CategoryTS, Product, ProductRealTS } from '../supabase.types'
import { TProductServer } from '@/lib/product-validation'
import { GetUserInfo } from '@/app/actions'
import { error } from 'console'
import { data } from 'autoprefixer'


export const fetchProductsByCategories = async (categories: string[], page: number, limit = 30) => {
    const offset = (page - 1) * limit
    const categoryJoinAlias = alias(category_join, 'cj2');

    try {
        let query = db
            .select({
                id: category_join.product_id,
                name: product.name,
                created_at: product.created_at,
                updated_at: product.updated_at,
                description: product.description,
                user_id: product.user_id,
                preview_image: product.preview_image,
                price: product.price,
                width: product.width,
                heigth: product.heigth,
                length: product.length,
                type: product.type,
                material: product.material,
                start_date: product.start_date,
                end_date: product.end_date,
                all_img: product.all_img,
            })
            .from(category_join)
            .innerJoin(category, eq(category.name_slug, category_join.category_name_slug))
            .innerJoin(product, eq(product.id, category_join.product_id));

        if (categories.length > 1) {
            // @ts-ignore
            query = query
                .innerJoin(categoryJoinAlias, eq(category_join.product_id, categoryJoinAlias.product_id))
                .where(
                    and(
                        eq(category_join.category_name_slug, categories[0]),
                        eq(categoryJoinAlias.category_name_slug, categories[1])
                    )
                );
        } else {
            // @ts-ignore
            query = query
                .where(eq(category_join.category_name_slug, categories[0]));
        }

        const result = await query
            .limit(limit)
            .offset(offset);
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
                        eq(category_join.category_name_slug, categories[0]),
                        eq(categoryJoinAlias.category_name_slug, categories[1])
                    )
                );
        } else {
            // @ts-ignore
            countQuery = countQuery
                .where(eq(category_join.category_name_slug, categories[0]));
        }


        const countResult = await countQuery;
        const totalCount = countResult[0]?.count || 0;


        return {
            data: result,
            error: undefined,
            totalCount: totalCount
        };
    } catch (error) {
        console.error("Error fetching products:", error);
        return {
            data: undefined,
            error: "Failed to fetch products.",
            totalCount: 0
        };
    }
};

export const fetchAllProducts = async (page = 1, limit = 30) => {
    const offset = (page - 1) * limit

    try {
        const result = await db.select()
            .from(product)
            .orderBy(desc(product.created_at))
            .limit(limit)
            .offset(offset)

        const [{ count }] = await db.select({
            count: sql<number>`count(*)`
        }).from(product)

        return {
            data: result as Product[],
            error: undefined,
            totalCount: count
        }
    } catch (error) {
        console.error("Error fetching products:", error)
        return {
            data: undefined,
            error: "Failed to fetch products",
            totalCount: 0
        }
    }
}

export const addProduct = async (prod: TProductServer) => {
    const p: ProductRealTS = {
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
            if (prod.start_date == "") {
                p.start_date = null
            }
            if (prod.end_date == "") {
                p.end_date = null
            }
            //add product
            const insertedProduct = await tx.insert(product)
                .values(p)
                .returning({ id: product.id });

            const productId = insertedProduct[0]?.id;

            if (!productId) {
                throw new Error("Failed to insert product.");
            }
            //add category join
            const category: CategoryTS = {
                category_name_slug: prod.category,
                product_id: productId,
            };

            await tx.insert(category_join)
                .values(category);
            //add address
            const ad: AddressTS = {
                full_address: prod.address.properties.full_address,
                location: {
                    x: prod.address.geometry.coordinates[0],
                    y: prod.address.geometry.coordinates[1],
                },
                postal_code: prod.address.properties.context.postcode.name,
                address_number: prod.address.properties.context.address.address_number,
                region: prod.address.properties.context.region.name,
                country_code: prod.address.properties.context.country.country_code,
                country_name: prod.address.properties.context.country.name,
            }

            const insertedAddress = await tx.insert(address).values(ad).returning({ id: address.id })
            const addressId = insertedAddress[0].id
            if (!addressId) {
                throw new Error("Failed to insert product -> invalid address id")
            }
            //add address join
            const adJoin: AddressJoinProductTS = {
                product_id: productId,
                address_id: addressId,
            }
            await tx.insert(address_join_product).values(adJoin)
        });

        return {
            data: "Product and category successfully added",
            error: undefined,
        };
    } catch (error) {
        console.log("ERR", error)
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
        console.log("Error fetching product", error)
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export type ProductAndCategory = {
    category_join: CategoryJoin,
    products: Product,
}
export const fetchUserProducts = async () => {
    try {
        //get user identity
        const user = await GetUserInfo()
        if (user.error) {
            return {
                data: undefined,
                error: "User unauthorized"
            }
        }
        const result = await db.select().from(category_join).innerJoin(product, eq(category_join.product_id, product.id)).where(eq(product.user_id, user.data.user.id)) as ProductAndCategory[]
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
            error,
        }
    }
}