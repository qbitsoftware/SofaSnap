"server only"

import db from '@/utils/supabase/db'
import { category, category_join, product, address, address_join_product, review, product_review, favorite } from '@/utils/supabase/schema'
import { eq, and, sql, desc, inArray, gte, asc, isNull, or } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import { AddressTS, CategoryJoin, CategoryTS, Product, ProductRealTS, ProductReviewTS, ProductWithAddress } from '../supabase.types'
import { Review, TProductServer } from '@/lib/product-validation'
import { GetUserInfo } from '@/app/actions'

export const fetchProductsByCategories = async (categories: string[], page: number, sort: string | undefined, limit = 30) => {
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
                address: product.address,
                all_img: product.all_img,
                unique_id: product.unique_id,
                total_clicks: product.total_clicks,
                last_visited: product.last_visited,
                deleted_at: product.deleted_at,
                status: product.status,
            })
            .from(category_join)
            .innerJoin(category, eq(category.name_slug, category_join.category_name_slug))
            .innerJoin(product, eq(product.id, category_join.product_id))



        if (categories.length > 1) {
            // @ts-expect-error - Complex query with multiple joins
            query = query
                .innerJoin(categoryJoinAlias, eq(category_join.product_id, categoryJoinAlias.product_id))
                .where(
                    and(
                        eq(category_join.category_name_slug, categories[0]),
                        eq(categoryJoinAlias.category_name_slug, categories[1]),
                        eq(product.status, "accepted")
                    )
                );
        } else {
            // @ts-expect-error - Complex query with multiple joins
            query = query
                .where(
                    and(
                        isNull(product.deleted_at),
                        eq(product.status, "accepted"),
                        eq(category_join.category_name_slug, categories[0])
                    )
                )
        }

        const result = await query
            .limit(limit)
            .offset(offset)
            .orderBy(
                sort === 'date' ? desc(product.created_at) :
                    sort === 'price_asc' ? asc(product.price) :
                        sort === 'price_desc' ? desc(product.price) :
                            sort === 'popularity' ? desc(product.total_clicks) :
                                desc(product.created_at)
            );

        let countQuery = db
            .select({ count: sql`count(*)`.mapWith(Number) })
            .from(category_join)
            .innerJoin(product, eq(product.id, category_join.product_id));

        if (categories.length > 1) {
            // @ts-expect-error - Complex query with multiple joins
            countQuery = countQuery
                .innerJoin(categoryJoinAlias, eq(category_join.product_id, categoryJoinAlias.product_id))
                .where(
                    and(
                        isNull(product.deleted_at),
                        eq(category_join.category_name_slug, categories[0]),
                        eq(categoryJoinAlias.category_name_slug, categories[1]),
                        eq(product.status, "accepted")
                    )
                );
        } else {
            // @ts-expect-error - Complex query with multiple joins
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

export const fetchAllProducts = async (page = 1, sort: string | undefined, limit = 30) => {
    const offset = (page - 1) * limit

    try {
        const result = await db.select()
            .from(product)
            .where(and(eq(product.status, "accepted"), isNull(product.deleted_at)))
            .limit(limit)
            .offset(offset)
            .orderBy(
                sort === 'date' ? desc(product.created_at) :
                    sort === 'price_asc' ? asc(product.price) :
                        sort === 'price_desc' ? desc(product.price) :
                            sort === 'popularity' ? desc(product.total_clicks) :
                                desc(product.created_at)
            );

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

export const fetchLastSeenProducts = async () => {
    const maxProducts = 10;
    try {
        const result = await db.select()
            .from(product)
            .orderBy(desc(product.last_visited))
            .limit(maxProducts)
            .where(
                and(
                    eq(product.status, "accepted"),
                    isNull(product.deleted_at),
                )
            )

        return {
            data: result as Product[],
            error: undefined,
        }
    } catch (error) {
        console.error("Error fetching last seen products:", error)
        return {
            data: undefined,
            error: "Failed to fetch products",
        }
    }
}

export const fetchPopularProducts = async () => {
    const maxProducts = 10;
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    try {
        let result = await db.select()
            .from(product)
            .where(
                and(
                    eq(product.status, "accepted"),
                    gte(product.created_at, firstDayOfMonth),
                    isNull(product.deleted_at),
                )
            )
            .orderBy(desc(product.total_clicks))
            .limit(maxProducts)

        if (result.length < 3) {
            result = await db.select()
                .from(product)
                .where(
                    and(
                        eq(product.status, "accepted"),
                        isNull(product.deleted_at),
                    )
                )
                .orderBy(desc(product.total_clicks))
                .limit(maxProducts)
        }

        return {
            data: result as Product[],
            error: undefined,
        }
    } catch (error) {
        console.error("Error fetching popular products:", error)
        return {
            data: undefined,
            error: "Failed to fetch products",
        }
    }
}


export const fetchProductsWithAddresses = async () => {
    try {
        const result = await db
            .select({
                product: product,
                address: address,
                category: category,
                favorite: favorite
            })
            .from(address_join_product)
            .where(
                and(
                    eq(product.status, "accepted"),
                    isNull(product.deleted_at),
                )
            )
            .innerJoin(category_join, eq(address_join_product.product_id, category_join.product_id))
            .innerJoin(category, eq(category.name_slug, category_join.category_name_slug))
            .innerJoin(product, eq(address_join_product.product_id, product.id))
            .innerJoin(address, eq(address_join_product.address_id, address.id))
            .innerJoin(favorite, eq(favorite.product_id, product.id));

        if (result.length === 0) {
            return {
                data: [],
                error: "No products found",
            };
        }

        const productsWithAddresses: ProductWithAddress[] = result.map((row) => ({
            ...row.product,
            // address: row.address,
            address: row.product.address,
            category: row.category,
            favorite: row.favorite ? true : false,
        }));

        return {
            data: productsWithAddresses,
            error: undefined,
        };
    } catch (error) {
        console.error("Error fetching products with addresses:", error);
        return {
            data: undefined,
            error: "Server error"
        };
    }
};

export const fetchProductsByIds = async (productIDs: number[]) => {
    try {
        const result = await db
            .select({
                product: product,
                address: address,
                category: category,
                favorite: favorite
            })
            .from(address_join_product)
            .where(
                and(
                    isNull(product.deleted_at),
                    inArray(address_join_product.product_id, productIDs),
                    eq(product.status, "accepted")
                )
            )
            .innerJoin(category_join, eq(address_join_product.product_id, category_join.product_id))
            .innerJoin(category, eq(category.name_slug, category_join.category_name_slug))
            .innerJoin(product, eq(address_join_product.product_id, product.id))
            .innerJoin(address, eq(address_join_product.address_id, address.id))
            .innerJoin(favorite, eq(favorite.product_id, product.id));

        if (result.length === 0) {
            return {
                data: [],
                error: "No products found",
            };
        }

        const productsWithAddresses: ProductWithAddress[] = result.map((row) => ({
            ...row.product,
            // address: row.address,
            address: row.product.address,
            category: row.category,
            favorite: row.favorite ? true : false,
        }));

        return {
            data: productsWithAddresses,
            error: undefined,
        };
    } catch (error) {
        console.error("Error fetching products with addresses:", error);
        return {
            data: undefined,
            error: "Server error"
        };
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
        unique_id: prod.unique_id,
        status: "not_paid",
        all_img: prod.all_img,
        deleted_at: null,
        address: prod.address,
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
                .onConflictDoUpdate({
                    target: product.unique_id,
                    set: {
                        name: p.name,
                        description: p.description,
                        width: p.width,
                        heigth: p.heigth,
                        length: p.length,
                        material: p.material,
                        type: p.type,
                        price: p.price,
                        preview_image: p.preview_image,
                        all_img: p.all_img,
                        start_date: p.start_date,
                        end_date: p.end_date,
                        address: p.address,
                        updated_at: new Date().toISOString(),
                    }
                })
                .returning({ id: product.id });

            const productId = insertedProduct[0]?.id;

            if (!productId) {
                throw new Error("Failed to insert product.");
            }
            const category: CategoryTS = {
                category_name_slug: prod.category.replaceAll("ä", "a").replaceAll("ö", "o").replaceAll("õ", "o").replaceAll("ü", "u").replaceAll("ž", "z"),
                product_id: productId,
            };

            const sub_category: CategoryTS = {
                category_name_slug: prod.sub_category.toLowerCase().replace(/\s*-\s*|\s+/g, '-').replaceAll("ä", "a").replaceAll("ö", "o").replaceAll("õ", "o").replaceAll("ü", "u").replaceAll("ž", "z"),
                product_id: productId,
            };

            await tx.insert(category_join)
                .values(category).
                onConflictDoUpdate({
                    target: [category_join.product_id, category_join.category_name_slug],
                    set: {
                        category_name_slug: category.category_name_slug,
                    }
                })

            await tx.insert(category_join)
                .values(sub_category).
                onConflictDoUpdate({
                    target: [category_join.product_id, category_join.category_name_slug],
                    set: {
                        category_name_slug: sub_category.category_name_slug,
                    }
                })


            // const ad: AddressTS = {

            //     full_address: prod.address.full_address!,
            //     location: {
            //         x: prod.address.location![0],
            //         y: prod.address.location![1],
            //     },
            //     postal_code: prod.address.postal_code!,
            //     address_number: prod.address.address_number!,
            //     region: prod.address.region!,
            //     country_code: prod.address.country_code!,
            //     country_name: prod.address.country_name!,
            // }


            // const insertedAddress = await tx.insert(address).
            //     values(ad).
            //     onConflictDoUpdate({
            //         target: address.full_address,
            //         set: {
            //             full_address: ad.full_address,
            //             location: ad.location,
            //             postal_code: ad.postal_code,
            //             address_number: ad.address_number,
            //             region: ad.region,
            //             country_code: ad.country_code,
            //             country_name: ad.country_name
            //         }
            //     }).
            //     returning({ id: address.id })
            // const addressId = insertedAddress[0].id
            // if (!addressId) {
            //     throw new Error("Failed to insert product -> invalid address id")
            // }
            //add address join
            // const adJoin: AddressJoinProductTS = {
            //     product_id: productId,
            //     address_id: addressId,
            // }

            // await tx.insert(address_join_product).values(adJoin).
            //     onConflictDoUpdate({
            //         target: product.id,
            //         set: {
            //             address_id: adJoin.address_id,
            //         }
            //     })
        });

        return {
            data: "Product and category successfully added",
            error: undefined,
        };
    } catch (error) {
        console.log("Big error", error)
        return {
            data: undefined,
            error: "Server error",
        };
    }
};

export const fetchProduct = async (id: number) => {
    try {
        const user = await GetUserInfo();

        let statusCondition;
        if (user && user.data.user?.user_metadata.role !== 1) {
            statusCondition = eq(product.status, "accepted");
        }

        let anotherstatusCondition;
        if (user && user.data.user) {
            anotherstatusCondition = eq(product.user_id, user.data.user.id)
        }

        let whereCondition;
        if (statusCondition && anotherstatusCondition) {
            // If user is not admin but owns the product, show it regardless of status
            whereCondition = or(
                and(eq(category_join.product_id, id), statusCondition, isNull(product.deleted_at)),
                and(eq(category_join.product_id, id), anotherstatusCondition, isNull(product.deleted_at))
            );
        } else if (statusCondition) {
            // Non-admin user, only show accepted products
            whereCondition = and(eq(category_join.product_id, id), statusCondition, isNull(product.deleted_at));
        } else {
            // Admin user, show all products
            whereCondition = and(eq(category_join.product_id, id), isNull(product.deleted_at));
        }

        const result = await db
            .select({
                product: product,
                category: category,
                favorite: favorite
            })
            .from(category_join)
            .where(whereCondition)
            .innerJoin(category, eq(category.name_slug, category_join.category_name_slug))
            .innerJoin(product, eq(category_join.product_id, product.id))
            .leftJoin(
                favorite,
                and(
                    eq(favorite.product_id, product.id),
                    user && user.data.user ? eq(favorite.user_id, user.data.user.id) : undefined
                )
            );

        if (result.length == 0) {
            return {
                data: undefined,
                error: "No results found"
            }
        }

        const productWithAddress: ProductWithAddress = {
            ...result[0].product,
            address: result[0].product.address,
            category: result[0].category,
            favorite: result[0].favorite ? true : false,
        };

        return {
            data: productWithAddress,
            error: undefined,
        };
    } catch (error) {
        void error;
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export const addClick = async (id: number) => {
    try {

        const prod = await db.select().from(product).where(eq(product.id, id)).execute();
        if (prod && prod[0].last_visited) {
            const currentTime = new Date()
            const lastVisitedTime = new Date(prod[0].last_visited)
            if (currentTime.getTime() - lastVisitedTime.getTime() > 5 * 60 * 1000) {
                await db.update(product).set({ total_clicks: sql`${product.total_clicks} + 1`, last_visited: currentTime.toISOString() }).where(eq(product.id, id))
            }
            return {
                data: undefined,
                error: undefined
            }
        }

    } catch (error: any) {
        void error;
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export type ProductAndCategory = {
    category_join: CategoryJoin,
    products: Product,
    addresses: AddressTS,
}

export type ProductAndCategories = {
    categories: CategoryJoin[],
    product: Product,
    address: AddressTS,
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
        const result = await db
            .select()
            .from(category_join)
            .innerJoin(product, eq(category_join.product_id, product.id))
            // .innerJoin(address_join_product, eq(address_join_product.product_id, product.id))
            // .innerJoin(address, eq(address_join_product.address_id, address.id))
            .where(and(eq(product.user_id, user.data.user.id), isNull(product.deleted_at)))
            .execute() as ProductAndCategory[];
        if (result.length == 0) {
            return {
                data: undefined,
                error: "No results found"
            }
        }

        const productMap = new Map<number, ProductAndCategories>()

        result.forEach(({ products, category_join, addresses }) => {
            if (!productMap.has(products.id)) {
                productMap.set(products.id, {
                    product: products,
                    categories: [category_join],
                    address: addresses,
                })
            } else {
                productMap.get(products.id)?.categories.push(category_join)
            }
        })

        const finalResult = Array.from(productMap.values())

        return {
            data: finalResult,
            error: undefined
        }

    } catch (error) {
        console.error("Error fetching user product:", error)
        return {
            data: undefined,
            error,
        }
    }
}


export const fetchUserProduct = async (product_id: number) => {
    try {
        const user = await GetUserInfo()
        if (user.error) {
            return {
                data: undefined,
                error: "Unauthorized",
            }
        }

        const result = await db
            .select()
            .from(category_join)
            .innerJoin(product, eq(category_join.product_id, product.id))
            .where(and(eq(product.id, product_id), isNull(product.deleted_at)))
            .execute() as { products: typeof product.$inferSelect, category_join: typeof category_join.$inferSelect }[];

        if (result.length == 0) {
            return {
                data: undefined,
                error: "No row found",
            }
        }

        if (result[0].products.user_id != user.data.user.id) {
            return {
                data: undefined,
                error: "Unauthorized",
            }
        }

        const productMap = new Map<number, ProductAndCategories>()

        result.forEach(({ products, category_join }) => {
            if (!productMap.has(products.id)) {
                productMap.set(products.id, {
                    product: products,
                    categories: [category_join],
                    address: {
                        full_address: products.address || "",
                        location: { x: 0, y: 0 },
                        postal_code: "",
                        address_number: "",
                        region: "",
                        country_code: "",
                        country_name: ""
                    },
                })
            } else {
                productMap.get(products.id)?.categories.push(category_join)
            }
        })

        const finalResult = Array.from(productMap.values())

        return {
            data: finalResult,
            error: undefined,
        }
    } catch (error) {
        console.error("Error adding review:", error)
        return {
            data: undefined,
            error,
        }
    }
}

export const addReview = async (formData: Review) => {
    try {
        const result = await db.insert(review).values({ rating: Number(formData.rating), feedback: formData.description }).returning({ id: review.id })
        const joinTable: ProductReviewTS = {
            user_id: formData.user_id,
            review_id: result[0].id,
            product_id: formData.product_id
        }
        await db.insert(product_review).values(joinTable)
        return {
            data: undefined,
            error: undefined
        }
    } catch (error: any) {
        console.log(error)
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export type Reviews = {
    product_reviews: {
        id: number;
        product_id: number;
        review_id: number;
    };
    reviews: {
        id: number;
        rating: number;
        feedback: string;
    };
}

export const getProductReviews = async (product_id: number) => {
    try {
        const reviews = await db.select().from(product_review).innerJoin(review, eq(product_review.review_id, review.id)).where(eq(product_review.product_id, product_id)).execute() as Reviews[]
        return {
            data: reviews,
            error: undefined
        }
    } catch (error) {
        console.error("Error getting product reviews:", error)
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export const changeProductStatus = async (product_id: number, status: string) => {
    try {
        const result = await db.update(product).set({ status: status }).where(eq(product.id, product_id)).returning();
        return {
            data: result,
            error: undefined,
        }
    } catch (error) {
        console.error("Error changing product status:", error)
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export const getPendingProducts = async () => {
    try {
        const user = await GetUserInfo()
        if (user.data && user.data.user?.user_metadata.role == 1) {
            const result = await db.select().from(product).where(and(eq(product.status, "pending"), isNull(product.deleted_at)))
            return {
                data: result,
                error: undefined
            }
        }
        return {
            data: undefined,
            error: undefined,
        }

    } catch (error) {
        console.error("Error getting pending products:", error)
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export const updateProductStatus = async (product_id: number, status: string) => {
    try {
        const user = await GetUserInfo()

        if (user.data && user.data.user?.user_metadata.role == 1) {
            await db.update(product).set({ status: status }).where(eq(product.id, product_id))
            return {
                data: undefined,
                error: undefined,
            }

        }
        return {
            data: undefined,
            error: 'Unauthorized',
        }
    } catch (error) {
        console.error("Error updating product status:", error)
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export const deleteProduct = async (product_id: number) => {
    try {
        const user = await GetUserInfo()
        if (!user || !user.data.user?.id) {
            return {
                data: undefined,
                error: "Palun logige uuesti sisse",
            };
        }

        // Igaks juhuks jatan selle siia

        // const items = await db.select().from(order_item)
        // .where(
        //     eq(order_item.product_id, product_id)
        // )

        // if (items) {
        //     const currentTime = new Date()
        //     for (let i = 0; i < items.length; i++) {
        //         const from = items[i].from;
        //         const to = items[i].to;
        //         if (from && to && currentTime >= from && currentTime <= to) {
        //             return {
        //                 data: undefined,
        //                 error: "Toode on hetkel rendis"
        //             }
        //         }
        //     }
        // }


        await db.update(product).set({ deleted_at: sql`CURRENT_TIMESTAMP` })
            .where(
                and(
                    eq(product.user_id, user.data.user.id),
                    eq(product.id, product_id))
            )

        return {
            data: "Toode on edukalt kuulutuste seast eemaldatud",
            error: undefined

        }

    } catch (error) {
        console.error("Error deleting product:", error)
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export const fetchSimilarProducts = async (category_slug: string, current_product_id: number, limit = 8) => {
    try {
        const result = await db
            .select({
                id: product.id,
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
                address: product.address,
                all_img: product.all_img,
                unique_id: product.unique_id,
                total_clicks: product.total_clicks,
                last_visited: product.last_visited,
                deleted_at: product.deleted_at,
                status: product.status,
            })
            .from(category_join)
            .innerJoin(product, eq(product.id, category_join.product_id))
            .where(
                and(
                    eq(category_join.category_name_slug, category_slug),
                    eq(product.status, "accepted"),
                    isNull(product.deleted_at),
                    sql`${product.id} != ${current_product_id}`
                )
            )
            .orderBy(desc(product.total_clicks))
            .limit(limit)

        return {
            data: result as Product[],
            error: undefined
        }
    } catch (error) {
        console.error("Error fetching similar products:", error)
        return {
            data: undefined,
            error: "Failed to fetch similar products"
        }
    }
}
