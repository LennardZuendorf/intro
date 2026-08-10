import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type * as React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

export function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <TooltipProvider>{children}</TooltipProvider>
      <SpeedInsights />
    </NextThemesProvider>
  );
}
