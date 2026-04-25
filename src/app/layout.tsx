import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/footer';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/retroui/Sonner';
import { ScrollArrow } from '@/components/scroll-arrow';
import { siteMeta } from '@/lib/site-meta';

import { cn } from '@/lib/utils/ui';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  return {
    title: siteMeta.title,
    description: siteMeta.description,
    openGraph: {
      title: siteMeta.title,
      description: siteMeta.description,
      url,
      images: [{ url: siteMeta.ogImage, width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: siteMeta.title,
      description: siteMeta.description,
      images: [{ url: siteMeta.ogImage, width: 1200, height: 630 }]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className={inter.className}>
      <head>
        {/* Preconnect for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body className={cn('min-h-screen bg-primary font-sans antialiased relative')}>
        <div className='absolute inset-0 -z-10 h-full w-full bg-primary' />
        <Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <div className='w-full'>
            {children}
            <Toaster />
          </div>
          <Footer />
        </Providers>
        <ScrollArrow />
      </body>
    </html>
  );
}
