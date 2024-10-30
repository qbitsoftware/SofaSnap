import { InferSelectModel } from "drizzle-orm";
import { category, address, category_join, product, user, address_join_product, product_review } from "./schema";

export type Product = InferSelectModel<typeof product>
export type Category = InferSelectModel<typeof category>
export type User = InferSelectModel<typeof user>
export type CategoryJoin = InferSelectModel<typeof category_join>
export type Address = InferSelectModel<typeof address>
export type AddressJoinProduct = InferSelectModel<typeof address_join_product>
export type ProductReview = InferSelectModel<typeof product_review>

export type ProductRealTS = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'rating' | 'last_visited' | 'total_clicks'> & Partial<Pick<Product, 'start_date' | 'end_date'>>;
export type CategoryTS = Omit<CategoryJoin, 'id'>
export type AddressTS = Omit<Address, 'id'>
export type ProductReviewTS = Omit<ProductReview, 'id'>
export type AddressJoinProductTS = Omit<AddressJoinProduct, 'id' | 'created_at'>
export type ProductWithAddress = Product & {
    address: Address;
    category: Category
};

