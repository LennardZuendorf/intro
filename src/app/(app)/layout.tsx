import type React from 'react';
import './globals.css';
import { ReactPlugin } from '@21st-extension/react';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-next';
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const twentyFirstConfig = {
    plugins: [ReactPlugin]
  };

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
          <Nav />
          <div className='w-full'>
            {children}
            <SetColorPreference />
            <Toaster />
          </div>
          <Footer />
        </Providers>
        <ScrollArrow />
        {process.env.NODE_ENV === 'development' && (
          <TwentyFirstToolbar config={twentyFirstConfig} />
        )}
      </body>
    </html>
  );
}
