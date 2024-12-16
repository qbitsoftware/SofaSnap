import { sql } from "drizzle-orm";
import { float } from "drizzle-orm/mysql-core";

import { boolean, decimal, doublePrecision, integer, pgEnum, pgSchema, pgTable, point, real, serial, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { number } from "zod";

const authSchema = pgSchema('auth');

export const user = authSchema.table('users', {
    id: uuid("id").primaryKey().notNull(),
    // raw_user_meta_data: jsonb("raw_user_meda_data"),
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
    }),
    deleted_at: timestamp("deleted_at", {
        withTimezone: true,
        mode: 'string',
    }),
    description: text("description"),
    user_id: uuid('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
    unique_id: uuid('unique_id').unique().notNull(),
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
    total_clicks: integer("total_clicks").default(0),
    last_visited: timestamp('last_visited', {
        withTimezone: true,
        mode: 'string',
        precision: 3
    }).$onUpdate(() => sql`NOW()`).defaultNow(),
    status: text("status").default("pending"),
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
    user_id: uuid('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
    product_id: integer("product_id").references(() => product.id, { onDelete: "cascade" }).notNull(),
    review_id: integer("review_id").references(() => review.id, { onDelete: "cascade" }).notNull(),
})

export const user_review = pgTable('user_reviews', {
    id: serial("id").primaryKey().notNull(),
    user_id: uuid("user_id").references(() => user.id, { onDelete: "cascade" }),
    reviewer_id: uuid('reviewer_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
    review_id: integer("review_id").references(() => review.id, { onDelete: "cascade" }).notNull(),
})


export const address = pgTable('addresses', {
    id: serial("id").primaryKey().notNull(),
    full_address: text("full_address").notNull().unique(),
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
}, (table) => {
    return {
        uniqueProductCategory: unique().on(table.product_id, table.category_name_slug),
    };
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


export const cart = pgTable("cart", {
    id: serial("id").primaryKey().notNull().unique(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
        precision: 3
    }).defaultNow().notNull().$onUpdate(() => sql`NOW()`),
    user_id: uuid("user_id").references(() => user.id, { onDelete: 'cascade' }).notNull()
})

export const cart_item = pgTable("cart_item", {
    id: serial("id").primaryKey().notNull().unique(),
    product_id: integer("product_id").references(() => product.id, { onUpdate: 'cascade', onDelete: 'cascade' }).notNull(),
    cart_id: integer("cart_id").notNull()
        .references(() => cart.id, { onDelete: 'cascade', onUpdate: 'cascade' })
        .notNull(),
    from: timestamp("from"),
    to: timestamp("to")
})

export const order = pgTable("orders", {
    id: serial("id").primaryKey().notNull().unique(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
        precision: 3
    }).defaultNow().notNull().$onUpdate(() => sql`NOW()`),
    buyer_id: uuid("buyer_id").references(() => user.id).notNull(),
    price: real("price").notNull(),
    fee: real("fee").notNull(),
    total_price: real("total_price"),
    is_paid: boolean("is_paid").notNull(),
    status: text("status").notNull(),
    provider: text("provider"),
    transaction_id: uuid("transaction_id").notNull()
})

export const order_item = pgTable("order_items", {
    id: serial("id").primaryKey().notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
        precision: 3
    }).defaultNow().notNull().$onUpdate(() => sql`NOW()`),
    product_id: integer("product_id").references(() => product.id).notNull(),
    order_id: integer("order_id").references(() => order.id, {onDelete: "cascade", onUpdate: "cascade"}).notNull(),
    from: timestamp("from"),
    to: timestamp("to"),
})

export const complaint = pgTable("complaints", {
    id: serial("id").primaryKey().notNull(),
    text: text("text").notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    updated_at: timestamp('updated_at', {
        withTimezone: true,
        mode: 'string',
        precision: 3
    }).defaultNow().notNull().$onUpdate(() => sql`NOW()`),
    resolved: boolean("resolved").default(false),
})