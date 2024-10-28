ALTER TABLE "products" ADD COLUMN "total_clicks" integer;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "last_visited" timestamp(3) with time zone;--> statement-breakpoint
ALTER TABLE "auth"."users" DROP COLUMN IF EXISTS "raw_user_meda_data";