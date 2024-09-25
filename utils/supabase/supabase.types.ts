import { InferSelectModel } from "drizzle-orm";
import { category, product, user } from "./schema";

export type Product = InferSelectModel<typeof product>
export type Category = InferSelectModel<typeof category>
export type User = InferSelectModel<typeof user>