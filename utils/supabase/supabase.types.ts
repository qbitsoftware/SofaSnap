import { InferSelectModel } from "drizzle-orm";
import { category, address, category_join, product, user, address_join_product, product_review, cart_item, cart, order, order_item } from "./schema";
import { Infer } from "next/dist/compiled/superstruct";

export type Product = InferSelectModel<typeof product>
export type Category = InferSelectModel<typeof category>
export type User = InferSelectModel<typeof user>
export type CategoryJoin = InferSelectModel<typeof category_join>
export type Address = InferSelectModel<typeof address>
export type AddressJoinProduct = InferSelectModel<typeof address_join_product>
export type ProductReview = InferSelectModel<typeof product_review>
export type Order = InferSelectModel<typeof order>

export type ProductRealTS = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'rating' | 'last_visited' | 'total_clicks'> & Partial<Pick<Product, 'start_date' | 'end_date'>>;
export type CategoryTS = Omit<CategoryJoin, 'id'>
export type AddressTS = Omit<Address, 'id'>
export type ProductReviewTS = Omit<ProductReview, 'id'>
export type AddressJoinProductTS = Omit<AddressJoinProduct, 'id' | 'created_at'>
export type ProductWithAddress = Product & {
    address: Address;
    category: Category
};

export type CartItem = InferSelectModel<typeof cart_item>
export type CartItemTS = Omit<CartItem, "cart_id" | "id">
export type CartItemJoinProduct = CartItem & Product
export type Cart = InferSelectModel<typeof cart>

export type OrderTS = Omit<Order, "id" | "created_at" | "updated_at">
export type OrderItem = InferSelectModel<typeof order_item>
export type OrderItemTS = Omit<OrderItem, "id" | "created_at" | "updated_at">