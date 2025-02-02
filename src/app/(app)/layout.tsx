import type React from 'react';
import './globals.css';
import { Footer } from '@/components/footer';
import { Providers } from '@/components/providers';
import { siteMetadata } from '@/data/site';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { Nav } from '@/components/navbar';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { env } from '@/env';

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
        <body className={cn('relative min-h-screen bg-bg font-sans antialiased')}>
          <Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <Nav />
            <div className={cn('container mx-auto grow place-content-center md:w-9/12 w-11/12')}>
              {children}
              <Toaster />
            </div>
            <Footer />
          </Providers>
        </body>
      </html>
    </>
  );
}
