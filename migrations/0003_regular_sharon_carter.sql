CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
-- Step 1: Add the column first
ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "name_slug" text NOT NULL;

-- Step 2: Add the unique constraint after ensuring the column exists
ALTER TABLE "categories" ADD CONSTRAINT IF NOT EXISTS "categories_name_slug_unique" UNIQUE("name_slug");
