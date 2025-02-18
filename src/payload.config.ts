import { postgresAdapter } from '@payloadcms/db-postgres';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { resendAdapter } from '@payloadcms/email-resend';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { s3Storage } from '@payloadcms/storage-s3';
import { env } from '@/env';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { Experiences } from '@/collections/Experience';
import { Tag } from '@/collections/Tag';
import { LegalTexts, PageContent } from '@/payload-globals';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { ProjectPost } from '@/collections/ProjectPost';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          height: 667,
          label: 'Mobile',
          width: 375
        }
      ]
    }
  },
  email: resendAdapter({
    defaultFromAddress: 'dev@admin.zuendorf.me',
    defaultFromName: 'Payload CMS',
    apiKey: env.RESEND_API_KEY || ''
  }),
  editor: lexicalEditor({}),
  secret: env.PAYLOAD_SECRET || '',
  serverURL: env.NEXT_PUBLIC_URL,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.POSTGRES_URL || ''
    }
  }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['project'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Website.com — ${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt
    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media'
        }
      },
      bucket: env.S3_STORAGE_BUCKET,
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY,
          secretAccessKey: env.S3_SECRET_KEY
        },
        region: env.S3_REGION,
        endpoint: env.S3_STORAGE_URL
      }
    })
  ],
  collections: [Media, Users, Tag, Experiences, ProjectPost],
  globals: [PageContent, LegalTexts]
});
