import type React from 'react';
import './globals.css';
import { ScrollArrow } from '@/components/ScrollArrow';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/navbar';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { siteMetadata } from '@/data/site';
import { env } from '@/env';
import SetColorPreference from '@/lib/utils/setColorPreference';
import { cn } from '@/lib/utils/ui';
import { StagewiseToolbar } from '@stagewise/toolbar-next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const stagewiseConfig = {
    plugins: []
  };

  return (
    <>
      <html lang='en' suppressHydrationWarning className={inter.className}>
        <head>
          <title>{siteMetadata.title}</title>
          <Script
            src={env.NEXT_PUBLIC_UMAMI_SCRIPT_SRC}
            data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy='lazyOnload'
          />
        </head>
        <body className={cn('min-h-screen bg-primary font-sans antialiased relative')}>
          <div className='absolute inset-0 -z-10 h-full w-full bg-primary' />
          <Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <Nav />
            <div className='w-full'>
              {children}
              <SetColorPreference />
              <Toaster />
            </div>
            <Footer />
          </Providers>
          <ScrollArrow />
          {process.env.NODE_ENV === 'development' && <StagewiseToolbar config={stagewiseConfig} />}
        </body>
      </html>
    </>
  );
}
