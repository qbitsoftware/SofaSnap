import { InferSelectModel } from "drizzle-orm";
import { product } from "./schema";

export type Product = InferSelectModel<typeof product>