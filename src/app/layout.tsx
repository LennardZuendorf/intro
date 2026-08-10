import type React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Archivo_Black, Space_Grotesk, Space_Mono } from 'next/font/google';
import { Footer } from '@/components/footer';
import { Providers } from '@/components/providers';
import { AccentProvider } from '@/components/theme/accent-provider';
import { AccentScript } from '@/components/theme/accent-script';
import { Toaster } from '@/components/ui/retroui/Sonner';
import { siteMeta } from '@/lib/site-meta';

import { cn } from '@/lib/utils/ui';

const head = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-head',
  display: 'swap'
});

const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
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
    <html
      lang='en'
      suppressHydrationWarning
      className={cn(sans.variable, head.variable, mono.variable)}
    >
      <head>
        {/* Accent no-flash script — runs before first paint, sets --primary from lz_accent */}
        <AccentScript />
        {/* Preconnect for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      </head>
      <body
        className={cn('min-h-screen bg-background text-foreground font-sans antialiased relative')}
      >
        <div className='absolute inset-0 -z-10 h-full w-full bg-background' />
        <Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <AccentProvider>
            <div className='w-full'>
              {children}
              <Toaster />
            </div>
            <Footer />
          </AccentProvider>
        </Providers>
      </body>
    </html>
  );
}
