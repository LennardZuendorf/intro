import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "section_content_quick_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "site_controls" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_visibility_show_projects" boolean DEFAULT true,
  	"section_visibility_show_about" boolean DEFAULT true,
  	"socials_linkedin_id" integer,
  	"socials_github_id" integer,
  	"socials_mail_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "page_content" RENAME TO "section_content";
  ALTER TABLE "page_content_rels" RENAME TO "section_content_rels";
  ALTER TABLE "legal_texts" RENAME TO "legal_content";
  ALTER TABLE "tag" DROP CONSTRAINT "tag_icon_id_media_id_fk";
  
  ALTER TABLE "section_content" DROP CONSTRAINT "page_content_avatar_id_media_id_fk";
  
  ALTER TABLE "section_content" DROP CONSTRAINT "page_content_selected_projects_id_projects_id_fk";
  
  ALTER TABLE "section_content" DROP CONSTRAINT "page_content_selected_experiences_id_experiences_id_fk";
  
  ALTER TABLE "section_content_rels" DROP CONSTRAINT "page_content_rels_parent_fk";
  
  ALTER TABLE "section_content_rels" DROP CONSTRAINT "page_content_rels_tag_fk";
  
  DROP INDEX IF EXISTS "tag_icon_idx";
  DROP INDEX IF EXISTS "page_content_avatar_idx";
  DROP INDEX IF EXISTS "page_content_selected_projects_idx";
  DROP INDEX IF EXISTS "page_content_selected_experiences_idx";
  DROP INDEX IF EXISTS "page_content_rels_order_idx";
  DROP INDEX IF EXISTS "page_content_rels_parent_idx";
  DROP INDEX IF EXISTS "page_content_rels_path_idx";
  DROP INDEX IF EXISTS "page_content_rels_tag_id_idx";
  DO $$ BEGIN
   ALTER TABLE "section_content_quick_skills" ADD CONSTRAINT "section_content_quick_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."section_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "site_controls" ADD CONSTRAINT "site_controls_socials_linkedin_id_tag_id_fk" FOREIGN KEY ("socials_linkedin_id") REFERENCES "public"."tag"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "site_controls" ADD CONSTRAINT "site_controls_socials_github_id_tag_id_fk" FOREIGN KEY ("socials_github_id") REFERENCES "public"."tag"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "site_controls" ADD CONSTRAINT "site_controls_socials_mail_id_tag_id_fk" FOREIGN KEY ("socials_mail_id") REFERENCES "public"."tag"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "site_controls" ADD CONSTRAINT "site_controls_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "section_content_quick_skills_order_idx" ON "section_content_quick_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "section_content_quick_skills_parent_id_idx" ON "section_content_quick_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "site_controls_socials_socials_linkedin_idx" ON "site_controls" USING btree ("socials_linkedin_id");
  CREATE INDEX IF NOT EXISTS "site_controls_socials_socials_github_idx" ON "site_controls" USING btree ("socials_github_id");
  CREATE INDEX IF NOT EXISTS "site_controls_socials_socials_mail_idx" ON "site_controls" USING btree ("socials_mail_id");
  CREATE INDEX IF NOT EXISTS "site_controls_meta_meta_image_idx" ON "site_controls" USING btree ("meta_image_id");
  DO $$ BEGIN
   ALTER TABLE "section_content" ADD CONSTRAINT "section_content_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "section_content" ADD CONSTRAINT "section_content_selected_projects_id_projects_id_fk" FOREIGN KEY ("selected_projects_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "section_content" ADD CONSTRAINT "section_content_selected_experiences_id_experiences_id_fk" FOREIGN KEY ("selected_experiences_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "section_content_rels" ADD CONSTRAINT "section_content_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."section_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "section_content_rels" ADD CONSTRAINT "section_content_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "section_content_avatar_idx" ON "section_content" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "section_content_selected_projects_idx" ON "section_content" USING btree ("selected_projects_id");
  CREATE INDEX IF NOT EXISTS "section_content_selected_experiences_idx" ON "section_content" USING btree ("selected_experiences_id");
  CREATE INDEX IF NOT EXISTS "section_content_rels_order_idx" ON "section_content_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "section_content_rels_parent_idx" ON "section_content_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "section_content_rels_path_idx" ON "section_content_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "section_content_rels_tag_id_idx" ON "section_content_rels" USING btree ("tag_id");
  ALTER TABLE "tag" DROP COLUMN IF EXISTS "icon_id";
  ALTER TABLE "section_content" DROP COLUMN IF EXISTS "about_main_section";
  ALTER TABLE "section_content" DROP COLUMN IF EXISTS "about_subsection";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "section_content_quick_skills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_controls" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "section_content_quick_skills" CASCADE;
  DROP TABLE "site_controls" CASCADE;
  ALTER TABLE "section_content" RENAME TO "page_content";
  ALTER TABLE "section_content_rels" RENAME TO "page_content_rels";
  ALTER TABLE "legal_content" RENAME TO "legal_texts";
  ALTER TABLE "page_content" DROP CONSTRAINT "section_content_avatar_id_media_id_fk";
  
  ALTER TABLE "page_content" DROP CONSTRAINT "section_content_selected_projects_id_projects_id_fk";
  
  ALTER TABLE "page_content" DROP CONSTRAINT "section_content_selected_experiences_id_experiences_id_fk";
  
  ALTER TABLE "page_content_rels" DROP CONSTRAINT "section_content_rels_parent_fk";
  
  ALTER TABLE "page_content_rels" DROP CONSTRAINT "section_content_rels_tag_fk";
  
  DROP INDEX IF EXISTS "section_content_avatar_idx";
  DROP INDEX IF EXISTS "section_content_selected_projects_idx";
  DROP INDEX IF EXISTS "section_content_selected_experiences_idx";
  DROP INDEX IF EXISTS "section_content_rels_order_idx";
  DROP INDEX IF EXISTS "section_content_rels_parent_idx";
  DROP INDEX IF EXISTS "section_content_rels_path_idx";
  DROP INDEX IF EXISTS "section_content_rels_tag_id_idx";
  ALTER TABLE "tag" ADD COLUMN "icon_id" integer;
  ALTER TABLE "page_content" ADD COLUMN "about_main_section" jsonb NOT NULL;
  ALTER TABLE "page_content" ADD COLUMN "about_subsection" jsonb NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "tag" ADD CONSTRAINT "tag_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content" ADD CONSTRAINT "page_content_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content" ADD CONSTRAINT "page_content_selected_projects_id_projects_id_fk" FOREIGN KEY ("selected_projects_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content" ADD CONSTRAINT "page_content_selected_experiences_id_experiences_id_fk" FOREIGN KEY ("selected_experiences_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content_rels" ADD CONSTRAINT "page_content_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content_rels" ADD CONSTRAINT "page_content_rels_tag_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tag"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tag_icon_idx" ON "tag" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "page_content_avatar_idx" ON "page_content" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "page_content_selected_projects_idx" ON "page_content" USING btree ("selected_projects_id");
  CREATE INDEX IF NOT EXISTS "page_content_selected_experiences_idx" ON "page_content" USING btree ("selected_experiences_id");
  CREATE INDEX IF NOT EXISTS "page_content_rels_order_idx" ON "page_content_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "page_content_rels_parent_idx" ON "page_content_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "page_content_rels_path_idx" ON "page_content_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "page_content_rels_tag_id_idx" ON "page_content_rels" USING btree ("tag_id");`);
}
