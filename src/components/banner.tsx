'use client';

import { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { S, XS } from '@/components/ui/typography';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function Banner() {
  const [isAcknowledged, setIsAcknowledged] = useState(true);

  // Check localStorage on initial render
  useEffect(() => {
    const acknowledgment = localStorage.getItem('trackingCheck');
    if (acknowledgment != 'true') {
      setIsAcknowledged(false);
    }
  }, []);

  // Handle button click
  const handleButtonClick = () => {
    localStorage.setItem('trackingCheck', JSON.stringify(true));
    setIsAcknowledged(true); // Hide the banner
  };

  if (isAcknowledged) {
    return null;
  }

  return (
    <Alert className='z-[5000] bg-card fixed inset-x-0 bottom-5 2xl:w-4/12 xl:w-6/12 lg:8/12 md:10/12 10/12 mx-auto mt-4'>
      <Info className='h-4 w-4' />
      <AlertTitle>Cookieless Tracking</AlertTitle>
      <AlertDescription className='grid grid-cols-6 space-x-2'>
        <div className='flex flex-col space-y-2 col-span-5 pt-2'>
          <XS>
            I use <b>privacy-friendly, cookieless tracking</b> to enhance my website while
            respecting your privacy. <br />
            This cookie-less method doesn&apos;t require consent and avoids tracking you across
            sessions.
          </XS>
          <S>
            I use tools like{' '}
            <a className='underline' href='https://umami.ts'>
              Umami
            </a>{' '}
            and{' '}
            <a className='underline' href='https://highlight.io'>
              Highlight.io
            </a>
          </S>
        </div>
        <div className='space-y-2 flex flex-col'>
          <Button onClick={handleButtonClick} className='flex-1' size='sm'>
            <S>OK</S>
          </Button>
          <Link
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'sm:text-wrap'
            })}
            href='/legal/privacy'
          >
            <S>Learn More</S>
          </Link>
        </div>
      </AlertDescription>
    </Alert>
  );
}
