import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { resendAdapter } from '@payloadcms/email-resend';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { Experiences } from '@/collections/Experience';
import { ProjectPost } from '@/collections/ProjectPost';
import { Tag } from '@/collections/Tag';
import { env } from '@/env';
import { LegalContent, SectionContent, SiteControls } from '@/payload-globals';
import { Media } from './collections/Media';
import { Users } from './collections/Users';

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
    defaultFromAddress: 'intro@ignitr.dev',
    defaultFromName: 'Intro Payload CMS',
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
      globals: ['siteControls'],
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
  globals: [SectionContent, LegalContent, SiteControls]
});
