ALTER TABLE "categories" DROP CONSTRAINT "categories_name_slug_unique";--> statement-breakpoint
ALTER TABLE "categories" DROP COLUMN IF EXISTS "name_slug";