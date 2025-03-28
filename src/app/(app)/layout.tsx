import type React from 'react';
import './globals.css';
import { Footer } from '@/components/footer';
import { Providers } from '@/components/providers';
import { siteMetadata } from '@/data/site';
import { cn } from '@/lib/utils/ui';
import Script from 'next/script';
import { Nav } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { env } from '@/env';
import SetColorPreference from '@/lib/utils/setColorPreference';
import { ScrollArrow } from '@/components/ScrollArrow';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <body className={cn('min-h-screen bg-bg font-sans antialiased relative')}>
          <div className='absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] bg-[size:20px_20px]' />
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
        </body>
      </html>
    </>
  );
}
