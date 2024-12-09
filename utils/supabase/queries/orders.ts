import { calculatePrice } from "@/lib/utils";
import db from "../db"
import { cart, order, order_item, product } from "../schema"
import { OrderItemJoinProduct, OrderItemTS, OrderTS } from "../supabase.types"
import { CartItemWithDetails } from "./cart";
import { and, eq } from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core";
import { error } from "console";
import { GetUserInfo } from "@/app/actions";

export const addOrder = async (cart: CartItemWithDetails[], transaction_id: string) => {
    try {
        const result = await db.transaction(async (tx) => {
            const { price, fee, total } = calculatePrice(cart)
            const orderData: OrderTS = {
                price: price,
                fee: fee,
                total_price: total,
                buyer_id: cart[0].cart.user_id,
                is_paid: false,
                provider: "",
                status: "started",
                transaction_id: transaction_id
            }

            const oldOrder = await tx.select()
                .from(order)
                .where(
                    and(
                        eq(order.buyer_id, cart[0].cart.user_id),
                        eq(order.is_paid, false))
                )

            for (let i = 0; i < oldOrder.length; i++) {
                await tx.delete(order).where(eq(order.id, oldOrder[i].id))
            }

            const [newOrder] = await tx.insert(order).values(orderData).returning();

            const orderItemsData: OrderItemTS[] = cart.map((item) => {
                return {
                    product_id: item.product.id,
                    order_id: newOrder.id,
                    from: item.cart_item.from,
                    to: item.cart_item.to,
                }
            })


            await tx.insert(order_item).values(orderItemsData);

            return {
                data: null,
                error: undefined
            }
        });

        return result;

    } catch (error) {
        return {
            data: undefined,
            error: "Server error"
        }
    }
};


export const getOrderItemsByProduct = async (productID: number) => {
    try {
        const result = await db.select()
            .from(order_item)
            .where(eq(order_item.product_id, productID))

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

export const changeOrderStatus = async (provider: string, transaction_id: string, status: string) => {
    try {
        const result = await db.update(order).set({ provider: provider, status: status }).where(eq(order.transaction_id, transaction_id)).returning();
        return {
            data: result,
            error: undefined,
        }

    } catch (error) {
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export const completeOrder = async (provider: string, transaction_id: string) => {
    try {
        const result = await db.update(order).set({ is_paid: true, provider: provider, status: "COMPLETED" }).where(eq(order.transaction_id, transaction_id)).returning();
        try {
            await db.delete(cart).where(eq(cart.user_id, result[0].buyer_id))
        } catch (error) {
            console.log(error)
            return {
                data: undefined,
                error: "Server error"
            }
        }
        return {
            data: result,
            error: undefined,
        }

    } catch (error) {
        return {
            data: undefined,
            error: "Server error"
        }
    }
}

export const getOrder = async (transaction_id: string) => {
    try {
        const result = await db.select().from(order).where(eq(order.transaction_id, transaction_id))
        if (result.length == 0) {
            return {
                data: undefined,
                error: "Order not found"
            }
        }
        return {
            data: result,
            error: undefined
        }
    } catch (error) {
        return {
            data: undefined,
            error: "Server Error"
        }
    }
}


export const getOrderItems = async (order_id: number) => {
    try {
        const user = await GetUserInfo()
        if (!user || !user.data.user?.id) {
            return {
                data: undefined,
                error: "Unauthorized"
            }
        }
        const result = await db.select({
            order: order,
            order_item: order_item,
            product: product,
        })
            .from(order_item)
            .innerJoin(product, eq(product.id, order_item.product_id))
            .innerJoin(order, eq(order.id, order_id))
            .where(and(eq(order_item.order_id, order_id), eq(order.buyer_id, user.data.user?.id)))

        if (result.length == 0) {
            return {
                data: undefined,
                error: "Orderitems not found"
            }
        }

        const items: OrderItemJoinProduct[] = result.map(row => ({
            order: row.order,
            order_item: row.order_item,
            product: row.product
        }))

        return {
            data: items,
            error: undefined
        }
    } catch (error) {
        return {
            data: undefined,
            error: "Server error"
        }
    }
}