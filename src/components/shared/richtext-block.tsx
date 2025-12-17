'use client';

import { RichText } from 'basehub/react-rich-text';
import type { CalloutComponentComponent, UnionCalloutComponentComponent } from 'basehub-types';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { CalloutComponent, type CalloutComponentProps } from '@/components/shared/richtext/callout';
import {
  Code,
  Em,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Link,
  M,
  Quote,
  Strong
} from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';

interface RichTextBlockProps {
  children: ReactNode;
  className?: string;
  blocks?: UnionCalloutComponentComponent[];
}

// Only H1-H3 headings get links. H4-H6 do not have anchored links.
const Heading = ({
  as,
  id,
  children
}: {
  as: 'h1' | 'h2' | 'h3';
  id?: string;
  children: ReactNode;
}) => {
  const HeadingComponent = { h1: H1, h2: H2, h3: H3 }[as];

  if (!id) {
    return <HeadingComponent>{children}</HeadingComponent>;
  }

  return (
    <HeadingComponent id={id}>
      <Link
        href={`#${id}`}
        underline='hover'
        color='default'
        className='text-inherit'
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', `#${id}`);
          }
        }}
      >
        {children}
      </Link>
    </HeadingComponent>
  );
};

// Headings for H4, H5, and H6 (no link, style only)
const HeadingNoLink = ({
  as,
  id,
  children
}: {
  as: 'h4' | 'h5' | 'h6';
  id?: string;
  children: ReactNode;
}) => {
  if (as === 'h4') {
    return <H4 id={id}>{children}</H4>;
  } else if (as === 'h5') {
    return <H5 id={id}>{children}</H5>;
  }
  // h6: use H6 from typography
  return <H6 id={id}>{children}</H6>;
};

export const RichTextBlock = ({ children, className, blocks }: RichTextBlockProps) => {
  return (
    <article
      className={cn(
        className,
        'prose max-w-none dark:prose-invert prose-headings:text-[inherit] prose-headings:font-[inherit] prose-p:text-[inherit] prose-p:leading-7 prose-a:no-underline hover:prose-a:underline prose-ul:my-2 prose-ol:my-2 prose-li:my-0 prose-img:my-4 prose-blockquote:my-4 text-prettier subpixel-antialiased'
      )}
    >
      <RichText
        blocks={blocks}
        components={{
          img: (props: { src?: string; alt?: string; [key: string]: unknown }) => (
            <Image
              src={props.src || ''}
              alt={props.alt || ''}
              width={800}
              height={400}
              className='rounded-lg border-2 border-black dark:border-white my-4'
            />
          ),
          h1: (props) => (
            <Heading as='h1' id={props.id}>
              {props.children}
            </Heading>
          ),
          h2: (props) => (
            <Heading as='h2' id={props.id}>
              {props.children}
            </Heading>
          ),
          h3: (props) => (
            <Heading as='h3' id={props.id}>
              {props.children}
            </Heading>
          ),
          h4: (props) => (
            <HeadingNoLink as='h4' id={props.id}>
              {props.children}
            </HeadingNoLink>
          ),
          h5: (props) => (
            <HeadingNoLink as='h5' id={props.id}>
              {props.children}
            </HeadingNoLink>
          ),
          h6: (props) => (
            <HeadingNoLink as='h6' id={props.id}>
              {props.children}
            </HeadingNoLink>
          ),
          p: ({ children }) => (
            <M as='div' className='first:mt-0 mt-2'>
              {children}
            </M>
          ),
          blockquote: ({ children }) => <Quote className='my-4'>{children}</Quote>,

          // lists
          ul: ({ children }) => <ul className='my-2 ml-5 list-disc space-y-1'>{children}</ul>,
          ol: ({ children }) => <ol className='my-2 ml-5 list-decimal space-y-1'>{children}</ol>,
          li: ({ children }) => (
            <li className='[&>div]:m-0'>
              <M as='div' className='mt-0'>
                {children}
              </M>
            </li>
          ),
          hr: () => <hr className='my-6 border-t-2 border-border' />,

          // inline elements
          a: ({ children, href, ...rest }) => {
            // Check if it's an external link
            const isExternal = href?.startsWith('http') || href?.startsWith('//');
            return (
              <Link href={href || '#'} external={isExternal} underline='hover' {...rest}>
                {children}
              </Link>
            );
          },
          code: ({ children }) => <Code variant='soft'>{children}</Code>,
          b: ({ children }) => <Strong>{children}</Strong>,
          em: ({ children }) => <Em>{children}</Em>,
          highlight: ({ children }) => (
            <M as='span' className='font-bold bg-accent text-accent-foreground px-1'>
              {children}
            </M>
          ),
          // Custom components
          CalloutComponentComponent: (props: CalloutComponentComponent) => (
            <CalloutComponent
              type={props.type as CalloutComponentProps['type']}
              title={props.title}
              content={props.content}
              _id={props._id}
              __typename={props.__typename}
            />
          )
        }}
      >
        {children}
      </RichText>
    </article>
  );
};
