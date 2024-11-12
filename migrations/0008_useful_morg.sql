ALTER TABLE "orders" DROP CONSTRAINT "orders_seller_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "seller_id";