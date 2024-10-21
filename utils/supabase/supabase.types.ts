import { InferSelectModel } from "drizzle-orm";
import { category, address, category_join, product, user, address_join_product } from "./schema";

export type Product = InferSelectModel<typeof product>
export type Category = InferSelectModel<typeof category>
export type User = InferSelectModel<typeof user>
export type CategoryJoin = InferSelectModel<typeof category_join>
export type Address = InferSelectModel<typeof address>
export type AddressJoinProduct = InferSelectModel<typeof address_join_product>

export type ProductRealTS = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'rating'> & Partial<Pick<Product, 'start_date' | 'end_date'>>;
export type CategoryTS = Omit<CategoryJoin, 'id'>
export type AddressTS = Omit<Address, 'id'>
export type AddressJoinProductTS = Omit<AddressJoinProduct, 'id' | 'created_at'>
export type ProductWithAddress = Product & {
    address: Address;
    category:Category
};

