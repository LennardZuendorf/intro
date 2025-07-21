import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "section_content_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "section_content_rels" CASCADE;
  ALTER TABLE "section_content" RENAME COLUMN "selected_projects_id" TO "selected_project_id";
  ALTER TABLE "section_content" RENAME COLUMN "selected_experiences_id" TO "selected_experience_id";
  ALTER TABLE "section_content" DROP CONSTRAINT "section_content_selected_projects_id_projects_id_fk";
  
  ALTER TABLE "section_content" DROP CONSTRAINT "section_content_selected_experiences_id_experiences_id_fk";
  
  DROP INDEX IF EXISTS "section_content_selected_projects_idx";
  DROP INDEX IF EXISTS "section_content_selected_experiences_idx";
  DO $$ BEGIN
   ALTER TABLE "section_content" ADD CONSTRAINT "section_content_selected_project_id_projects_id_fk" FOREIGN KEY ("selected_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "section_content" ADD CONSTRAINT "section_content_selected_experience_id_experiences_id_fk" FOREIGN KEY ("selected_experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "section_content_selected_project_idx" ON "section_content" USING btree ("selected_project_id");
  CREATE INDEX IF NOT EXISTS "section_content_selected_experience_idx" ON "section_content" USING btree ("selected_experience_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "section_content_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tag_id" integer
  );
  
  ALTER TABLE "section_content" RENAME COLUMN "selected_project_id" TO "selected_projects_id";
  ALTER TABLE "section_content" RENAME COLUMN "selected_experience_id" TO "selected_experiences_id";
  ALTER TABLE "section_content" DROP CONSTRAINT "section_content_selected_project_id_projects_id_fk";
  
  ALTER TABLE "section_content" DROP CONSTRAINT "section_content_selected_experience_id_experiences_id_fk";
  
  DROP INDEX IF EXISTS "section_content_selected_project_idx";
  DROP INDEX IF EXISTS "section_content_selected_experience_idx";
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
  
  CREATE INDEX IF NOT EXISTS "section_content_rels_order_idx" ON "section_content_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "section_content_rels_parent_idx" ON "section_content_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "section_content_rels_path_idx" ON "section_content_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "section_content_rels_tag_id_idx" ON "section_content_rels" USING btree ("tag_id");
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
  
  CREATE INDEX IF NOT EXISTS "section_content_selected_projects_idx" ON "section_content" USING btree ("selected_projects_id");
  CREATE INDEX IF NOT EXISTS "section_content_selected_experiences_idx" ON "section_content" USING btree ("selected_experiences_id");`)
}
