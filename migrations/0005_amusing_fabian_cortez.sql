ALTER TABLE "cart" ADD CONSTRAINT "cart_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_id_unique" UNIQUE("id");