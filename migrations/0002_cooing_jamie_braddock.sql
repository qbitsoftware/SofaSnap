CREATE TABLE IF NOT EXISTS "addresses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_address" text NOT NULL,
	"location" "point" NOT NULL,
	"postal_code" text NOT NULL,
	"address_number" text NOT NULL,
	"region" text NOT NULL,
	"country_code" text NOT NULL,
	"country_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address_join" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" uuid NOT NULL,
	"address_id" uuid NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address_join" ADD CONSTRAINT "address_join_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address_join" ADD CONSTRAINT "address_join_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
