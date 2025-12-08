import { OpenPanelComponent } from '@openpanel/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type * as React from 'react';
import { env } from '@/env';

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <OpenPanelComponent clientId={env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID} trackScreenViews={true} />
      {children}
      <SpeedInsights />
    </NextThemesProvider>
  );
}
