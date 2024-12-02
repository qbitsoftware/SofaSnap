import { calculatePrice } from "@/lib/utils";
import db from "../db"
import { order, order_item, product } from "../schema"
import { OrderItemTS, OrderTS } from "../supabase.types"
import { CartItemWithDetails } from "./cart";
import { and, eq } from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core";
import { error } from "console";

export const addOrder = async (cart: CartItemWithDetails[]) => {
    try {


        const result = await db.transaction(async (tx) => {
            const { price, fee, total } = calculatePrice(cart)
            const orderData: OrderTS = {
                price: price,
                fee: fee,
                total_price: total,
                buyer_id: cart[0].cart.user_id,
                is_paid: false,
                provider: ""
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

export const completeOrder = async (buyer_id: string, is_paid: boolean, provider: string) => {
    try {
        const result = await db.update(order).set({ is_paid: is_paid, provider: provider }).where(eq(order.buyer_id, buyer_id));
        return {
            data: result,
            error: undefined,
        }
    } catch (error) {
        return {
            data: undefined,
            error: error
        }
    }
}