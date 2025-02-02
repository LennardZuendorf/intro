import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_skills_proficiency" AS ENUM('beginner', 'intermediate', 'advanced', 'expert');
  CREATE TYPE "public"."enum_tech_category" AS ENUM('frontend', 'backend', 'database', 'devops', 'other');
  CREATE TABLE IF NOT EXISTS "experiences_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"responsibility" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company" varchar NOT NULL,
  	"position" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"live_url" varchar,
  	"repo_url" varchar,
  	"cover_image_id" integer,
  	"date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tech_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"proficiency" "enum_skills_proficiency" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "tech" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon_id" integer,
  	"category" "enum_tech_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "experiences_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "projects_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "skills_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tech_id" integer;
  DO $$ BEGIN
   ALTER TABLE "experiences_responsibilities" ADD CONSTRAINT "experiences_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_tags" ADD CONSTRAINT "projects_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tech_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tech" ADD CONSTRAINT "tech_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "experiences_responsibilities_order_idx" ON "experiences_responsibilities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experiences_responsibilities_parent_id_idx" ON "experiences_responsibilities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "projects_tags_order_idx" ON "projects_tags" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_tags_parent_id_idx" ON "projects_tags" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_cover_image_idx" ON "projects" USING btree ("cover_image_id");
  CREATE INDEX IF NOT EXISTS "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "projects_rels_tech_id_idx" ON "projects_rels" USING btree ("tech_id");
  CREATE INDEX IF NOT EXISTS "skills_updated_at_idx" ON "skills" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "skills_created_at_idx" ON "skills" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "tech_icon_idx" ON "tech" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "tech_updated_at_idx" ON "tech" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tech_created_at_idx" ON "tech" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_skills_id_idx" ON "payload_locked_documents_rels" USING btree ("skills_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tech_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "experiences_responsibilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "experiences" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "projects_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "skills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tech" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "experiences_responsibilities" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "projects_tags" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "skills" CASCADE;
  DROP TABLE "tech" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_experiences_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_projects_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_skills_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tech_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_experiences_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_projects_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_skills_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_tech_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "experiences_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "projects_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "skills_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "tech_id";
  DROP TYPE "public"."enum_skills_proficiency";
  DROP TYPE "public"."enum_tech_category";`);
}
