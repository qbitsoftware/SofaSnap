import { sql } from "drizzle-orm";

import { doublePrecision, integer, pgSchema, pgTable, point, real, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

const authSchema = pgSchema('auth');

export const user = authSchema.table('users', {
    id: uuid("id").primaryKey().notNull(),
});

export const product = pgTable('products', {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
        precision: 3
    }).$onUpdate(() => sql`NOW()`),
    description: text("description"),
    user_id: uuid('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
    preview_image: text("preview_image").notNull(),
    price: doublePrecision("price").notNull(),
    width: integer("width").notNull(),
    heigth: integer("heigth").notNull(),
    length: integer("length").notNull(),
    material: text("material").notNull(),
    type: text("type"),
    start_date: timestamp("start_date", {
        withTimezone: true,
        mode: 'string',
    }),
    end_date: timestamp("end_date", {
        withTimezone: true,
        mode: 'string',
    }),
    all_img: text("all_img").array().default(sql`'{}'::text[]`),
})

export const category = pgTable('categories', {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull().unique(),
    name_slug: text("name_slug").notNull().unique(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    description: text("description"),
    image: text("image").notNull(),
    sub_categories: text("sub_categories").array().default(sql`'{}'::text[]`),
})
export const review = pgTable('reviews', {
    id: serial("id").primaryKey().notNull(),
    rating: real("rating").notNull(),
    feedback: text("feedback").notNull()
})

export const product_review = pgTable('product_reviews', {
    id: serial("id").primaryKey().notNull(),
    product_id: integer("product_id").references(() => product.id, { onDelete: "cascade" }).notNull(),
    review_id: integer("review_id").references(() => review.id, { onDelete: "cascade" }).notNull(),
})

export const user_review = pgTable('user_reviews', {
    id: serial("id").primaryKey().notNull(),
    user_id: uuid("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
    review_id: integer("review_id").references(() => review.id, { onDelete: "cascade" }).notNull(),
})


export const address = pgTable('addresses', {
    id: serial("id").primaryKey().notNull(),
    full_address: text("full_address").notNull(),
    location: point("location", { mode: "xy" }).notNull(),
    postal_code: text("postal_code").notNull(),
    address_number: text("address_number").notNull(),
    region: text("region").notNull(),
    country_code: text('country_code').notNull(),
    country_name: text('country_name').notNull(),
})
export const category_join = pgTable('category_join', {
    id: serial("id").primaryKey().notNull(),
    product_id: integer("product_id").references(() => product.id, { onDelete: 'cascade' }).notNull(),
    category_name_slug: text("category_name_slug").references(() => category.name_slug, { onUpdate: 'cascade' }).notNull(),
});

export const address_join = pgTable("address_join", {
    id: serial("id").primaryKey().notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    user_id: uuid('user_id').references(() => user.id).notNull(),
    address_id: integer("address_id").references(() => address.id).notNull(),
})

export const address_join_product = pgTable("address_join_products", {
    id: serial("id").primaryKey().notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    product_id: integer('product_id').references(() => product.id).notNull(),
    address_id: integer("address_id").references(() => address.id).notNull(),
})