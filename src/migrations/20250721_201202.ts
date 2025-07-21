import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE INDEX IF NOT EXISTS "projects_meta_meta_image_1_idx" ON "projects" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "_projects_v_version_meta_version_meta_image_1_idx" ON "_projects_v" USING btree ("version_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "projects_meta_meta_image_1_idx";
  DROP INDEX IF EXISTS "_projects_v_version_meta_version_meta_image_1_idx";`)
}
