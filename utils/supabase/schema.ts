import { sql } from "drizzle-orm";
import { integer, pgSchema, pgTable, point, real, serial, text,  timestamp, uuid } from "drizzle-orm/pg-core";

const authSchema = pgSchema('auth');

export const user = authSchema.table('users', {
	id: uuid('id').primaryKey(),
});

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
     price: real("price").notNull(),
     rating: real("rating"),
     
})

export const category = pgTable('categories', {
    id: serial("id").primaryKey().notNull(),
    name: text("name").notNull(),
    name_slug: text("name_slug").notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    description: text("description"),
    image: text("image").notNull(),
    sub_categories: text("sub_categories").array().default(sql`'{}'::text[]`),
})

export const category_join = pgTable('category_join', {
    id: serial("id").primaryKey().notNull(),
    product_id: integer("product_id").references(() => product.id, {onDelete: 'cascade'}).notNull(),
    category_name: text("category_name").references(() => category.name, {onUpdate:'cascade'}).notNull(),
});


export const address = pgTable('addresses', {
    id: uuid("id").notNull().primaryKey(),
    full_address: text("full_address").notNull(),
    location: point("location", {mode:"xy"}).notNull(),
    postal_code: text("postal_code").notNull(),
    address_number: text("address_number").notNull(),
    region: text("region").notNull(),
    country_code: text('country_code').notNull(),
    country_name: text('country_name').notNull(),
})

export const address_join = pgTable("address_join", {
    id: serial("id").primaryKey().notNull(),
    created_at: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }).defaultNow().notNull(),
    user_id: uuid('user_id').references(() => user.id).notNull(),
    address_id: uuid("address_id").references(() => address.id).notNull(),
})
