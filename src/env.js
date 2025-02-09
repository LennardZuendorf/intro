import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    POSTGRES_URL: z.string().url(),
    S3_ACCESS_KEY: z.string().min(1, 'S3_ACCESS_KEY is required'),
    S3_SECRET_KEY: z.string().min(1, 'S3_SECRET_KEY is required'),
    S3_REGION: z.string().min(1, 'S3_REGION is required'),
    S3_STORAGE_URL: z.string().url(),
    S3_STORAGE_BUCKET: z.string().min(1, 'S3_STORAGE_BUCKET is required'),
    PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),
    RESEND_API_KEY: z.string().min(1, 'RESEND API KEY is required'),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    NEXT_PUBLIC_URL: z.string().min(1, 'NEXT_PUBLIC_URL is required')
  },
  client: {
    NEXT_PUBLIC_UMAMI_SCRIPT_SRC: z.string().url(),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().uuid()
  },
  runtimeEnv: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    S3_REGION: process.env.S3_REGION,
    S3_STORAGE_URL: process.env.S3_STORAGE_URL,
    S3_STORAGE_BUCKET: process.env.S3_STORAGE_BUCKET,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_UMAMI_SCRIPT_SRC: process.env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000'
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
});
