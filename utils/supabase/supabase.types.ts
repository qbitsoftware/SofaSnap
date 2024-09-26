import { InferSelectModel } from "drizzle-orm";
import { category, category_join, product, productReal, user } from "./schema";

export type Product = InferSelectModel<typeof product>
export type Category = InferSelectModel<typeof category>
export type User = InferSelectModel<typeof user>
export type CategoryJoin = InferSelectModel<typeof category_join>


export type ProductReal = InferSelectModel<typeof productReal>
export type ProductRealTS = Omit<ProductReal, 'id' | 'created_at' | 'updated_at' | 'rating'> & Partial<Pick<ProductReal, 'start_date' | 'end_date'>>;
export type CategoryTS = Omit<CategoryJoin, 'id'>
