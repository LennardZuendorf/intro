import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    NEXT_PUBLIC_URL: z.string().min(1, 'NEXT_PUBLIC_URL is required'),
    BASEHUB_TOKEN: z.string().min(1, 'BASEHUB_TOKEN is required')
  },
  client: {
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID: z
      .string()
      .min(1, 'NEXT_PUBLIC_OPENPANEL_CLIENT_ID is required')
  },
  runtimeEnv: {
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000',
    // BaseHub environment variables
    BASEHUB_TOKEN: process.env.BASEHUB_TOKEN
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
});
