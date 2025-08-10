import type React from 'react';
import './globals.css';
import { ReactPlugin } from '@21st-extension/react';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-next';
import { basehub } from 'basehub';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Footer } from '@/components/footer';
import { Nav } from '@/components/navbar';
import { Providers } from '@/components/providers';
import { ScrollArrow } from '@/components/scroll-arrow';
import { Toaster } from '@/components/ui/toaster';
import SetColorPreference from '@/lib/utils/setColorPreference';
import { cn } from '@/lib/utils/ui';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await basehub().query({
    globals: {
      mainMeta: {
        title: true,
        desc: true,
        img: {
          url: true
        }
      },
      showAbout: true,
      showProjects: true
    }
  });

  return {
    title: data.globals.mainMeta.title || 'Lennard Zündorf',
    description:
      data.globals.mainMeta.desc || 'Full-stack product leader crafting digital experiences.',
    openGraph: {
      title: data.globals.mainMeta.title || 'Lennard Zündorf',
      description:
        data.globals.mainMeta.desc || 'Full-stack product leader crafting digital experiences.',
      url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
      images: [
        { url: data.globals.mainMeta.img?.url || '/img/opengraph.png', width: 1200, height: 630 }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.globals.mainMeta.title || 'Lennard Zündorf',
      description:
        data.globals.mainMeta.desc || 'Full-stack product leader crafting digital experiences.',
      images: [
        {
          url: data.globals.mainMeta.img?.url || '/img/opengraph.png',
          width: 1200,
          height: 630
        }
      ]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const twentyFirstConfig = {
    plugins: [ReactPlugin]
  };

  const data = await basehub().query({
    globals: {
      showAbout: true,
      showProjects: true
    }
  });

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
          <Nav showAbout={data.globals.showAbout} showProjects={data.globals.showProjects} />
          <div className='w-full'>
            {children}
            <SetColorPreference />
            <Toaster />
          </div>
          <Footer />
        </Providers>
        {data.globals.showAbout && data.globals.showProjects && <ScrollArrow />}
        {process.env.NODE_ENV === 'development' && (
          <TwentyFirstToolbar config={twentyFirstConfig} />
        )}
      </body>
    </html>
  );
}
