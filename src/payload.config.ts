import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { s3Storage } from '@payloadcms/storage-s3';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    }
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || ''
    }
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          prefix: 'media'
        }
      },
      // @ts-expect-error this is never null
      bucket: process.env.S3_STORAGE_BUCKET,
      config: {
        forcePathStyle: true,
        credentials: {
          // @ts-expect-error this is never null
          accessKeyId: process.env.S3_ACCESS_KEY,
          // @ts-expect-error this is never null
          secretAccessKey: process.env.S3_SECRET_KEY
        },
        region: process.env.S3_REGION,
        endpoint: process.env.S3_STORAGE_URL
      }
    })
  ]
});
