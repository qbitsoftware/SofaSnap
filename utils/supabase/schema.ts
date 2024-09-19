import { sql } from "drizzle-orm";
import { AnyPgColumn, integer, pgTable, real, serial, text, time, timestamp, uuid } from "drizzle-orm/pg-core";

export const product = pgTable('products', {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { 
        withTimezone: true, 
        mode: 'string', 
        precision: 3 
    }).$onUpdate(() => sql`NOW()`), 
     condition: text("condition").notNull(),
     description: text("description").notNull(),
     user_id: uuid('user_id'),
     preview_image: text("preview_image").notNull(),
     price: real("price").notNull().notNull(),
     rating: real("rating"),
})


export const category_join = pgTable('category_join', {
    id: serial("id").primaryKey().notNull(),
    product_id: integer("product_id").references(() => product.id, {onDelete: 'cascade'}).notNull(),
    category_name: text("category_name").references(() => category.name, {onUpdate:'cascade'}).notNull(),
});

export const category = pgTable('categories', {
    id: serial("id").primaryKey().notNull(),
    name: text("name").unique().notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    description: text("description"),
    image: text("image").notNull(),
    sub_categories: text("sub_categories").array().default(sql`'{}'::text[]`),
})


