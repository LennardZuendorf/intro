import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    NEXT_PUBLIC_URL: z.string().min(1, 'NEXT_PUBLIC_URL is required'),
    BASEHUB_TOKEN: z.string().optional(),
    BASEHUB_DRAFT: z.boolean().default(false)
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000',
    // BaseHub environment variables (optional after U4; removed in U12)
    BASEHUB_TOKEN: process.env.BASEHUB_TOKEN,
    BASEHUB_DRAFT: process.env.BASEHUB_DRAFT === 'true'
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
});
