CREATE TABLE IF NOT EXISTS "blogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"created_at" timestamp DEFAULT NOW(),
	"is_active" boolean DEFAULT true,
	"is_deleted" boolean DEFAULT false,
	"title" varchar(255) NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"image_url" varchar(255),
	"meta_title" varchar(255),
	"meta_description" text,
	"slug" varchar(255) NOT NULL,
	"tags" text,
	"status" varchar(20) DEFAULT 'Draft',
	"video_url" text,
	"gallery_urls" text,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"created_at" timestamp DEFAULT NOW(),
	"is_active" boolean DEFAULT true,
	"is_deleted" boolean DEFAULT false,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content_blocks" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"created_at" timestamp DEFAULT NOW(),
	"is_active" boolean DEFAULT true,
	"is_deleted" boolean DEFAULT false,
	"page_id" integer NOT NULL,
	"block_type" varchar(50) DEFAULT 'text',
	"content" text NOT NULL,
	"position" integer DEFAULT 0,
	"is_published" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "newsletter_subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"created_at" timestamp DEFAULT NOW(),
	"is_active" boolean DEFAULT true,
	"is_deleted" boolean DEFAULT false,
	"email" text NOT NULL,
	"name" varchar(255),
	"subscription_date" timestamp DEFAULT NOW(),
	"unsubscription_date" timestamp,
	"status" varchar(20) DEFAULT 'Subscribed',
	CONSTRAINT "newsletter_subscribers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"created_at" timestamp DEFAULT NOW(),
	"is_active" boolean DEFAULT true,
	"is_deleted" boolean DEFAULT false,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" varchar(255),
	"meta_title" varchar(255),
	"meta_description" text,
	"meta_keywords" varchar(255),
	"description" text,
	"content" text,
	"image_url" text,
	"video_url" text,
	"template" varchar(50) DEFAULT 'default',
	"og_image" varchar(255),
	"hero_image_url" varchar(255),
	"gallery_urls" text,
	"status" varchar(20) DEFAULT 'Draft',
	"position" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "pages_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"created_at" timestamp DEFAULT NOW(),
	"is_active" boolean DEFAULT true,
	"is_deleted" boolean DEFAULT false,
	"name" varchar(100) NOT NULL,
	"description" text,
	"weight" varchar(50),
	"category" varchar(50),
	"price" integer NOT NULL,
	"image_url" text,
	"stock_quantity" integer DEFAULT 0 NOT NULL,
	"is_featured" boolean DEFAULT false,
	"discount_percentage" integer DEFAULT 0,
	"tags" text,
	"meta_title" varchar(255),
	"meta_description" text,
	"slug" varchar(255) NOT NULL,
	"additional_images" text,
	"video_url" text,
	"status" varchar(20) DEFAULT 'Active',
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
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
	"meta_keywords" text,
	"og_title" text,
	"og_description" text,
	"og_url" text,
	"og_type" text DEFAULT 'website',
	"facebook_url" text,
	"instagram_url" text,
	"twitter_url" text,
	"youtube_url" text,
	"logo_url" text,
	"favicon_url" text,
	"google_analytics_id" varchar(50),
	"facebook_pixel_id" varchar(50),
	"default_language" varchar(10) DEFAULT 'en',
	"supported_languages" text,
	"twitter_handle" varchar(50),
	"default_image_url" text,
	"created_at" timestamp DEFAULT NOW(),
	"is_active" boolean DEFAULT true,
	"is_deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"site_id" integer NOT NULL,
	"created_at" timestamp DEFAULT NOW(),
	"is_active" boolean DEFAULT true,
	"is_deleted" boolean DEFAULT false,
	"username" varchar(64) NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(255) NOT NULL,
	"profile_image_url" text,
	"role" varchar(20) DEFAULT 'User',
	"is_verified" boolean DEFAULT false,
	"last_login" timestamp,
	"reset_token" varchar(255),
	"bio" text,
	"phone_number" varchar(15),
	CONSTRAINT "users_email_unique" UNIQUE("email")
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
 ALTER TABLE "products" ADD CONSTRAINT "products_site_id_site_info_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."site_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_site_id_site_info_id_fk" FOREIGN KEY ("site_id") REFERENCES "public"."site_info"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
