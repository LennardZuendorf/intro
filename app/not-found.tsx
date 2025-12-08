import * as React from 'react';
import type { Metadata } from 'next';
import { H4, Muted, M } from '@/components/ui/typography';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { IconButton } from '@/components/ui/button';
import Link from 'next/link';
import { RxArrowLeft } from 'react-icons/rx';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false
  }
};

export default function Home() {
  return (
    <section className='flex flex-col items-center gap-2 sm:gap-4 lg:gap-8 py-4 h-full w-full'>
      <div>
        <Card className='border-0'>
          <CardHeader className='justify-end'>
            <Muted>404</Muted>
          </CardHeader>
          <CardContent className='justify-start'>
            <H4>Page Not Found</H4>
            <M>The page your requested could not be found...</M>
          </CardContent>
          <CardFooter>
            <Link href='/'>
              <IconButton
                variant='outline'
                icon={<RxArrowLeft className='w-4 h-4' />}
                animationType='scale'
              >
                <span className='ml-2'>Return Home</span>
              </IconButton>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
