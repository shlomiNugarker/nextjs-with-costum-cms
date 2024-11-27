CREATE TABLE IF NOT EXISTS "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"image_url" varchar(255),
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content_blocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"page_id" integer NOT NULL,
	"block_type" varchar(50) NOT NULL,
	"content" text NOT NULL,
	"position" integer DEFAULT 0,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"title" varchar(255),
	"meta_title" varchar(255),
	"meta_description" text,
	"meta_keywords" varchar(255),
	"description" text,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "site_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_name" text NOT NULL,
	"description" text,
	"address" text,
	"contact_email" text,
	"phone_number" text,
	"opening_hours" text,
	"meta_title" text,
	"meta_description" text,
	"og_title" text,
	"og_description" text,
	"og_url" text,
	"og_type" text DEFAULT 'website',
	"facebook_url" text,
	"instagram_url" text,
	"twitter_url" text,
	"youtube_url" text,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"username" varchar(64) NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(64) NOT NULL,
	"profile_image_url" text,
	"role" varchar(20) DEFAULT 'User',
	"created_at" varchar(255) DEFAULT 'now()',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weekly_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"weight" varchar(50),
	"category" varchar(50),
	"price" integer NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT NOW()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blogs" ADD CONSTRAINT "blogs_site_id_site_info_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."site_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "contact_messages" ADD CONSTRAINT "contact_messages_site_id_site_info_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."site_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "content_blocks" ADD CONSTRAINT "content_blocks_site_id_site_info_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."site_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "content_blocks" ADD CONSTRAINT "content_blocks_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "newsletter_subscribers" ADD CONSTRAINT "newsletter_subscribers_site_id_site_info_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."site_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pages" ADD CONSTRAINT "pages_site_id_site_info_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."site_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_site_id_site_info_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."site_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weekly_products" ADD CONSTRAINT "weekly_products_site_id_site_info_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."site_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
