import React from 'react';
import { cn } from '@/lib/utils';
import '@/app/main.css';
import { ThemeProvider } from 'next-themes';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <body className={cn('relative min-h-screen bg-background font-sans antialiased')}>
            <div
              className={cn(
                'container mx-auto grow place-content-center w-full md:w-9/12 2xl:min-h-[95vh] xl:min-h-[75vh]'
              )}
            >
              {children}
            </div>
          </body>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </html>
    </>
  );
}
