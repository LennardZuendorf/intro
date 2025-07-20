'use client';

import { CheckCircle, CircleHelp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { SectionProps } from '@/app/(app)/page';
import { Button, buttonVariants } from '@/components/ui/button';
import { S, XS } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

export function Banner({ className }: SectionProps) {
  const [isAcknowledged, setIsAcknowledged] = useState(true);

  useEffect(() => {
    const acknowledgment = localStorage.getItem('trackingCheck');
    if (acknowledgment !== 'true') {
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
    <div
      className={cn(
        'z-[5000] bg-card fixed inset-x-0 bottom-5 2xl:w-6/12 lg:8/12 10/12 mx-auto mt-4 rounded-base shadow-shadow shadow-md font-heading border-2 border-border p-4 bg-primary hover:bg-accent-light transition-colors',
        className
      )}
    >
      <div className='flex flex-row justify-between gap-3 md:flex-row md:items-center'>
        <div className='flex flex-col space-y-2 col-span-5 pt-2'>
          <XS>
            I use <b>privacy-friendly, cookieless tracking</b> to enhance my website while
            respecting your privacy. <br />
            This cookie-less method doesn&apos;t require consent and avoids tracking you across
            sessions.
          </XS>
          <S>
            Used tools include{' '}
            <a className='underline' href='https://umami.ts'>
              Umami
            </a>{' '}
            and{' '}
            <a className='underline' href='https://vercel.com/docs/speed-insights'>
              Vercel Speed Insights
            </a>
          </S>
        </div>
        <div className='space-y-2 flex flex-col'>
          <Button onClick={handleButtonClick} className='flex-1' size='sm'>
            <S className='hidden sm:block'>OK</S>
            <CheckCircle className='block sm:hidden h-4 w-4' />{' '}
          </Button>
          <Link
            className={buttonVariants({
              variant: 'accent',
              size: 'sm',
              className: 'sm:text-wrap'
            })}
            href='/legal#privacy'
          >
            <S className='hidden sm:block'>Learn More</S>{' '}
            {/* Text visible on sm screens and larger */}
            <CircleHelp className='block sm:hidden h-4 w-4' />{' '}
            {/* Icon visible on screens smaller than sm */}
          </Link>
        </div>
      </div>
    </div>
  );
}
