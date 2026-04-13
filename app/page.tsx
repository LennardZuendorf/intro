import { Badge } from '@/components/retroui/Badge';
import { Text } from '@/components/retroui/Text';
import { siteMetadata } from '@/data/site';
import { pages } from '@/lib/source';
import * as React from 'react';

export default function Home() {
  const home = pages.find((p) => p.info.path === 'home.mdx');
  const Body = home?.body;

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
      <article className='mx-auto max-w-2xl px-4 sm:px-6 md:px-8 py-12 md:py-16 w-full'>
        <div className='relative mb-10 md:mb-12'>
          {home?.tagline && (
            <Badge
              variant='solid'
              className='absolute -top-4 -left-2 -rotate-2 font-mono shadow-[2px_2px_0_0_var(--border)]'
            >
              {home.tagline}
            </Badge>
          )}
          <Text
            as='h1'
            className='font-title font-black text-4xl sm:text-5xl md:text-6xl leading-tight'
          >
            {home?.title ?? "I'm Lennard"}
          </Text>
        </div>
        <div className='prose prose-sm sm:prose-base dark:prose-invert max-w-none'>
          {Body && <Body />}
        </div>
      </article>
    </>
  );
}
