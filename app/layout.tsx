import React from 'react';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Provider } from '@/components/provider-theme';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/nav';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import { lato, spartan, roboto_mono } from './fonts';
import { cn } from '@/lib/utils';
import { siteMetadata } from '@/data/site';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' }
  ],
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`
  },
  description: siteMetadata.description,
  keywords: [
    'Lennard Zündorf',
    'Product Manager',
    'Software Engineer',
    'Fullstack Developer',
    'Berlin',
    'CHECK24',
    'Portfolio',
    'Product Management',
    'Web Development'
  ],
  authors: [{ name: 'Lennard Zündorf', url: siteMetadata.siteUrl }],
  creator: 'Lennard Zündorf',
  openGraph: {
    type: 'website',
    locale: siteMetadata.locale,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: siteMetadata.title
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
    creator: '@lennardzuendorf'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/img/logo.png'
  },
  alternates: {
    canonical: siteMetadata.siteUrl
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'relative min-h-screen bg-background font-sans antialiased',
          lato.variable,
          spartan.variable,
          roboto_mono.variable
        )}
      >
        <Provider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <Nav />
          <main
            className={cn(
              'container mx-auto flex items-center justify-center w-full md:w-9/12 min-h-screen py-8'
            )}
          >
            {children}
          </main>
          <Footer />
        </Provider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
