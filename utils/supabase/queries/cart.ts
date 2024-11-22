import db from "../db"
import { cart, cart_item, product } from "../schema"

import { and, eq, sql } from "drizzle-orm";
import { Cart, CartItem, Product } from "../supabase.types";

export type CartItemWithDetails = {
    cart_item: CartItem;
    product: Product;
    cart: Cart;
};

export type GetCartResult = {
    data: CartItemWithDetails[] | undefined;
    error: string | undefined;
};

// Updated getCart function with typed return
export const getCart = async (userID: string): Promise<GetCartResult> => {
    try {
        const result = await db
            .select({
                cartItem: cart_item,
                cart: cart,
                product: product
            })
            .from(cart_item)
            .innerJoin(cart, eq(cart.id, cart_item.cart_id))
            .innerJoin(product, eq(product.id, cart_item.product_id))
            .where(eq(cart.user_id, userID));

        if (result.length === 0) {
            return {
                data: undefined,
                error: "No cart items found for this user"
            };
        }

        const cartItems = result.map(row => ({
            cart_item: row.cartItem,
            product: row.product,
            cart: row.cart
        }));

        return {
            data: cartItems,
            error: undefined
        };
    } catch (error) {
        return {
            data: undefined,
            error: "Server error"
        };
    }
};
export const createCart = async (userID: string) => {
    try {
        const existingCart = await db
            .select()
            .from(cart)
            .where(eq(cart.user_id, userID))
            .limit(1);
            
        if (existingCart.length > 0) {
            return {
                data: existingCart[0],
                error: undefined
            }
        }

        const cartResult = await db.insert(cart).values({
            user_id: userID,
        }).returning();

        return {
            data: cartResult[0],
            error: undefined
        };
    } catch (error) {
        void error;
        return {
            data: undefined,
            error: "Server error"
        }
    }
};


export const addCartItem = async (from: Date | null, to: Date | null, product_id: number, cart_id: number) => {
    try {
        const existingItem = await db
            .select()
            .from(cart_item)
            .where(
                and(
                    eq(cart_item.cart_id, cart_id),
                    eq(cart_item.product_id, product_id)
                )
            )
            .limit(1);

        if (existingItem.length > 0) {
            return {
                data: existingItem[0],
                error: "Toode on juba ostukorvi lisatud"
            };
        }

        const result = await db.insert(cart_item).values({
            cart_id: cart_id,
            product_id: product_id,
            from: from,
            to: to
        }).returning();

        return {
            data: result[0],
            error: undefined
        };
    } catch (error) {
        return {
            data: undefined,
            error: "Server error"
        };
    }

};

export const removeCartItem = async (cart_item_id: number, cart_id: number) => {
  try {
    await db
      .delete(cart_item)
      .where(eq(cart_item.id, cart_item_id));

    const remainingItems = await db
      .select({ count: sql<string>`COUNT(*)` })
      .from(cart_item)
      .where(eq(cart_item.cart_id, cart_id));

    if (parseInt(remainingItems[0].count, 10) === 0) {
      await db
        .delete(cart)
        .where(eq(cart.id, cart_id));
    }

    return {
      data: "Toode ostukorvist eemaldatud",
      error: undefined,
    };
  } catch (error) {
    return {
      data: undefined,
      error: "Toote ostukorvist eemaldamisel tekkis viga",
    };
  }
};
