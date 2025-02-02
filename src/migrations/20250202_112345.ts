import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_tech_category" RENAME TO "enum_techstacks_category";
  CREATE TABLE IF NOT EXISTS "techstacks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"icon_id" integer,
  	"category" "enum_techstacks_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar NOT NULL,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "main_her" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_callout" varchar NOT NULL,
  	"second_callout" varchar,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "main_her_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"techstacks_id" integer,
  	"projects_id" integer,
  	"experiences_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "socials_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "tech" RENAME TO "experiences_rels";
  ALTER TABLE "projects_rels" RENAME COLUMN "tech_id" TO "techstacks_id";
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_tech_fk";
  
  ALTER TABLE "experiences_rels" DROP CONSTRAINT "tech_icon_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tech_fk";
  
  DROP INDEX IF EXISTS "projects_rels_tech_id_idx";
  DROP INDEX IF EXISTS "tech_icon_idx";
  DROP INDEX IF EXISTS "tech_updated_at_idx";
  DROP INDEX IF EXISTS "tech_created_at_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_tech_id_idx";
  ALTER TABLE "experiences" ADD COLUMN "url" varchar;
  ALTER TABLE "experiences" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "experiences" ADD COLUMN "filename" varchar;
  ALTER TABLE "experiences" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "experiences" ADD COLUMN "filesize" numeric;
  ALTER TABLE "experiences" ADD COLUMN "width" numeric;
  ALTER TABLE "experiences" ADD COLUMN "height" numeric;
  ALTER TABLE "experiences" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "experiences" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "projects" ADD COLUMN "url" varchar;
  ALTER TABLE "projects" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "projects" ADD COLUMN "filename" varchar;
  ALTER TABLE "projects" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "projects" ADD COLUMN "filesize" numeric;
  ALTER TABLE "projects" ADD COLUMN "width" numeric;
  ALTER TABLE "projects" ADD COLUMN "height" numeric;
  ALTER TABLE "projects" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "projects" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "skills" ADD COLUMN "url" varchar;
  ALTER TABLE "skills" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "skills" ADD COLUMN "filename" varchar;
  ALTER TABLE "skills" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "skills" ADD COLUMN "filesize" numeric;
  ALTER TABLE "skills" ADD COLUMN "width" numeric;
  ALTER TABLE "skills" ADD COLUMN "height" numeric;
  ALTER TABLE "skills" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "skills" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "experiences_rels" ADD COLUMN "order" integer;
  ALTER TABLE "experiences_rels" ADD COLUMN "parent_id" integer NOT NULL;
  ALTER TABLE "experiences_rels" ADD COLUMN "path" varchar NOT NULL;
  ALTER TABLE "experiences_rels" ADD COLUMN "skills_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "techstacks_id" integer;
  DO $$ BEGIN
   ALTER TABLE "techstacks" ADD CONSTRAINT "techstacks_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_her" ADD CONSTRAINT "main_her_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_her_rels" ADD CONSTRAINT "main_her_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."main_her"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_her_rels" ADD CONSTRAINT "main_her_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_her_rels" ADD CONSTRAINT "main_her_rels_techstacks_fk" FOREIGN KEY ("techstacks_id") REFERENCES "public"."techstacks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_her_rels" ADD CONSTRAINT "main_her_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "main_her_rels" ADD CONSTRAINT "main_her_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "socials_socials" ADD CONSTRAINT "socials_socials_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "socials_socials" ADD CONSTRAINT "socials_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "techstacks_icon_idx" ON "techstacks" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "techstacks_updated_at_idx" ON "techstacks" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "techstacks_created_at_idx" ON "techstacks" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "techstacks_filename_idx" ON "techstacks" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "main_her_avatar_idx" ON "main_her" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_order_idx" ON "main_her_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "main_her_rels_parent_idx" ON "main_her_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_path_idx" ON "main_her_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "main_her_rels_skills_id_idx" ON "main_her_rels" USING btree ("skills_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_techstacks_id_idx" ON "main_her_rels" USING btree ("techstacks_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_projects_id_idx" ON "main_her_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_experiences_id_idx" ON "main_her_rels" USING btree ("experiences_id");
  CREATE INDEX IF NOT EXISTS "socials_socials_order_idx" ON "socials_socials" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "socials_socials_parent_id_idx" ON "socials_socials" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "socials_socials_icon_idx" ON "socials_socials" USING btree ("icon_id");
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_techstacks_fk" FOREIGN KEY ("techstacks_id") REFERENCES "public"."techstacks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_techstacks_fk" FOREIGN KEY ("techstacks_id") REFERENCES "public"."techstacks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "experiences_filename_idx" ON "experiences" USING btree ("filename");
  CREATE UNIQUE INDEX IF NOT EXISTS "projects_filename_idx" ON "projects" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "projects_rels_techstacks_id_idx" ON "projects_rels" USING btree ("techstacks_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "skills_filename_idx" ON "skills" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "experiences_rels_order_idx" ON "experiences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "experiences_rels_parent_idx" ON "experiences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "experiences_rels_path_idx" ON "experiences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "experiences_rels_skills_id_idx" ON "experiences_rels" USING btree ("skills_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_techstacks_id_idx" ON "payload_locked_documents_rels" USING btree ("techstacks_id");
  ALTER TABLE "experiences_rels" DROP COLUMN IF EXISTS "name";
  ALTER TABLE "experiences_rels" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "experiences_rels" DROP COLUMN IF EXISTS "icon_id";
  ALTER TABLE "experiences_rels" DROP COLUMN IF EXISTS "category";
  ALTER TABLE "experiences_rels" DROP COLUMN IF EXISTS "updated_at";
  ALTER TABLE "experiences_rels" DROP COLUMN IF EXISTS "created_at";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "tech_id";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tech_category" AS ENUM('frontend', 'backend', 'database', 'devops', 'other');
  CREATE TABLE IF NOT EXISTS "tech" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"icon_id" integer,
  	"category" "enum_tech_category",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "experiences_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "techstacks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "main_her" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "main_her_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "socials_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "socials" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "experiences_rels" CASCADE;
  DROP TABLE "techstacks" CASCADE;
  DROP TABLE "main_her" CASCADE;
  DROP TABLE "main_her_rels" CASCADE;
  DROP TABLE "socials_socials" CASCADE;
  DROP TABLE "socials" CASCADE;
  ALTER TABLE "projects_rels" DROP CONSTRAINT "projects_rels_techstacks_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_techstacks_fk";
  
  DROP INDEX IF EXISTS "experiences_filename_idx";
  DROP INDEX IF EXISTS "projects_filename_idx";
  DROP INDEX IF EXISTS "projects_rels_techstacks_id_idx";
  DROP INDEX IF EXISTS "skills_filename_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_techstacks_id_idx";
  ALTER TABLE "projects_rels" ADD COLUMN "tech_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tech_id" integer;
  DO $$ BEGIN
   ALTER TABLE "tech" ADD CONSTRAINT "tech_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tech_icon_idx" ON "tech" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "tech_updated_at_idx" ON "tech" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tech_created_at_idx" ON "tech" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tech_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tech_fk" FOREIGN KEY ("tech_id") REFERENCES "public"."tech"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "projects_rels_tech_id_idx" ON "projects_rels" USING btree ("tech_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tech_id_idx" ON "payload_locked_documents_rels" USING btree ("tech_id");
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "thumbnail_u_r_l";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "filename";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "mime_type";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "filesize";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "width";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "height";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "focal_x";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "focal_y";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "thumbnail_u_r_l";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "filename";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "mime_type";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "filesize";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "width";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "height";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "focal_x";
  ALTER TABLE "projects" DROP COLUMN IF EXISTS "focal_y";
  ALTER TABLE "projects_rels" DROP COLUMN IF EXISTS "techstacks_id";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "url";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "thumbnail_u_r_l";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "filename";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "mime_type";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "filesize";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "width";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "height";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "focal_x";
  ALTER TABLE "skills" DROP COLUMN IF EXISTS "focal_y";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "techstacks_id";
  DROP TYPE "public"."enum_techstacks_category";`);
}
