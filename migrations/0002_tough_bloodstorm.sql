ALTER TABLE "products" ADD COLUMN "unique_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "auth"."users" ADD COLUMN  IF NOT EXISTS "raw_user_meda_data" jsonb;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_full_address_unique" UNIQUE("full_address");--> statement-breakpoint
ALTER TABLE "category_join" ADD CONSTRAINT "category_join_product_id_category_name_slug_unique" UNIQUE("product_id","category_name_slug");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_unique_id_unique" UNIQUE("unique_id");