import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "experiences_filename_idx";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "thumbnail_u_r_l";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "filename";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "mime_type";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "filesize";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "width";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "height";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "focal_x";
  ALTER TABLE "experiences" DROP COLUMN IF EXISTS "focal_y";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT 'media';
  ALTER TABLE "experiences" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "experiences" ADD COLUMN "filename" varchar;
  ALTER TABLE "experiences" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "experiences" ADD COLUMN "filesize" numeric;
  ALTER TABLE "experiences" ADD COLUMN "width" numeric;
  ALTER TABLE "experiences" ADD COLUMN "height" numeric;
  ALTER TABLE "experiences" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "experiences" ADD COLUMN "focal_y" numeric;
  CREATE UNIQUE INDEX IF NOT EXISTS "experiences_filename_idx" ON "experiences" USING btree ("filename");`)
}
