import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "page_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"main_intro_section" jsonb NOT NULL,
  	"main_about_me_section" jsonb NOT NULL,
  	"avatar_id" integer,
  	"about_main_section" jsonb NOT NULL,
  	"about_subsection" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "page_content_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"techstacks_id" integer,
  	"projects_id" integer,
  	"experiences_id" integer
  );
  
  DROP TABLE "experiences_responsibilities" CASCADE;
  DROP TABLE "main_her" CASCADE;
  DROP TABLE "main_her_rels" CASCADE;
  ALTER TABLE "experiences" ADD COLUMN "responsibility_one" varchar NOT NULL;
  ALTER TABLE "experiences" ADD COLUMN "responsibility_two" varchar;
  ALTER TABLE "experiences" ADD COLUMN "responsibility_three" varchar;
  DO $$ BEGIN
   ALTER TABLE "page_content" ADD CONSTRAINT "page_content_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content_rels" ADD CONSTRAINT "page_content_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."page_content"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content_rels" ADD CONSTRAINT "page_content_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content_rels" ADD CONSTRAINT "page_content_rels_techstacks_fk" FOREIGN KEY ("techstacks_id") REFERENCES "public"."techstacks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content_rels" ADD CONSTRAINT "page_content_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "page_content_rels" ADD CONSTRAINT "page_content_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "page_content_avatar_idx" ON "page_content" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "page_content_rels_order_idx" ON "page_content_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "page_content_rels_parent_idx" ON "page_content_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "page_content_rels_path_idx" ON "page_content_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "page_content_rels_skills_id_idx" ON "page_content_rels" USING btree ("skills_id");
  CREATE INDEX IF NOT EXISTS "page_content_rels_techstacks_id_idx" ON "page_content_rels" USING btree ("techstacks_id");
  CREATE INDEX IF NOT EXISTS "page_content_rels_projects_id_idx" ON "page_content_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "page_content_rels_experiences_id_idx" ON "page_content_rels" USING btree ("experiences_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "experiences_responsibilities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"responsibility" varchar
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
  
  DROP TABLE "page_content" CASCADE;
  DROP TABLE "page_content_rels" CASCADE;
  DO $$ BEGIN
   ALTER TABLE "experiences_responsibilities" ADD CONSTRAINT "experiences_responsibilities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
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
  
  CREATE INDEX IF NOT EXISTS "experiences_responsibilities_order_idx" ON "experiences_responsibilities" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "experiences_responsibilities_parent_id_idx" ON "experiences_responsibilities" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "main_her_avatar_idx" ON "main_her" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_order_idx" ON "main_her_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "main_her_rels_parent_idx" ON "main_her_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_path_idx" ON "main_her_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "main_her_rels_skills_id_idx" ON "main_her_rels" USING btree ("skills_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_techstacks_id_idx" ON "main_her_rels" USING btree ("techstacks_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_projects_id_idx" ON "main_her_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "main_her_rels_experiences_id_idx" ON "main_her_rels" USING btree ("experiences_id");
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "responsibility_one";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "responsibility_two";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "responsibility_three";`);
}
