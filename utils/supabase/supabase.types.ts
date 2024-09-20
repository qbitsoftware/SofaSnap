import { InferSelectModel } from "drizzle-orm";
import { category, product } from "./schema";

export type Product = InferSelectModel<typeof product>
export type Category = InferSelectModel<typeof category>