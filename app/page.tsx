import { Card, CardContent } from '@/components/ui/card';
import { H1, Lead, Muted } from '@/components/ui/typography';
import { IconButton } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { RxEnvelopeOpen, RxGithubLogo, RxLinkedinLogo } from 'react-icons/rx';
import { siteConfig, siteMetadata } from '@/data/site';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Lennard Zündorf',
    url: siteMetadata.siteUrl,
    image: `${siteMetadata.siteUrl}${siteMetadata.image}`,
    jobTitle: 'Senior Product Manager & Software Engineer',
    description: siteMetadata.description,
    worksFor: {
      '@type': 'Organization',
      name: 'CHECK24 Flug'
    },
    sameAs: ['https://www.linkedin.com/in/lennard-zuendorf/', 'https://github.com/lennardzuendorf'],
    knowsAbout: [
      'Product Management',
      'Software Engineering',
      'Full Stack Development',
      'Innovation Management',
      'TypeScript',
      'React',
      'Next.js'
    ]
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className='flex flex-col items-center justify-center gap-4 md:gap-6 min-h-[80vh] px-4'>
        <Card
          className='w-full max-w-2xl shadow-2xl dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]'
          variant='default'
        >
          <CardContent className='flex flex-col gap-4 sm:gap-6 md:gap-8 p-6 sm:p-8 md:p-12 text-center'>
            <div className='flex flex-col gap-2 sm:gap-3 md:gap-4'>
              <H1 className='font-title font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                Lennard Zündorf
              </H1>
              <Lead type='foreground' className='font-semibold text-lg sm:text-xl md:text-2xl'>
                Fullstack Product Builder
              </Lead>
            </div>

            <p className='text-base sm:text-lg md:text-xl leading-relaxed font-medium'>
              I turn user needs into real products and features that just work - along the entire
              product development lifecycle.
            </p>

            <Muted className='text-sm sm:text-base md:text-lg'>
              Currently building and leading at{' '}
              <Link
                href='https://flug.check24.de'
                target='_blank'
                rel='noopener noreferrer'
                className='underline hover:text-foreground transition-colors'
              >
                Check24 Flug
              </Link>
              .
            </Muted>

            <div className='flex justify-center gap-3 sm:gap-4 pt-2 sm:pt-4'>
              <Link href={siteConfig.links.linkedin}>
                <IconButton
                  icon={<RxLinkedinLogo className='h-5 w-5' />}
                  size='icon'
                  animationType='scale'
                />
              </Link>
              <Link href={siteConfig.links.github}>
                <IconButton
                  icon={<RxGithubLogo className='h-5 w-5' />}
                  size='icon'
                  animationType='rotate'
                />
              </Link>
              <Link href={siteConfig.links.mail}>
                <IconButton
                  icon={<RxEnvelopeOpen className='h-5 w-5' />}
                  size='icon'
                  animationType='bounce'
                />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Badge variant='outline' className='flex items-center gap-2 py-2 px-4'>
          <Loader2 className='h-3 w-3 animate-spin' />
          <span className='text-xs font-mono'>New website coming soon</span>
        </Badge>
      </section>
    </>
  );
}
