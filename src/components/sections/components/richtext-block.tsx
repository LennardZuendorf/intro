import { RichText } from 'basehub/react-rich-text';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { H1, H2, H3, H4, M, Quote } from '@/components/ui/typography';

interface RichTextBlockProps {
  children: ReactNode;
}

export const RichTextBlock = ({ children }: RichTextBlockProps) => {
  return (
    <article
      className='
        prose max-w-none prose-invert
        prose-headings:text-[inherit] prose-headings:font-[inherit]
        prose-p:text-[inherit] prose-p:leading-7
        prose-a:no-underline hover:prose-a:underline
        prose-ul:my-2 prose-ol:my-2 prose-li:my-0
        prose-img:my-4 prose-blockquote:my-4
        text-prettier subpixel-antialiased
      '
    >
      <RichText
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
          h1: ({ children }) => <H1>{children}</H1>,
          h2: ({ children }) => <H2>{children}</H2>,
          h3: ({ children }) => <H3>{children}</H3>,
          p: ({ children }) => (
            <M as='div' className='first:mt-0 mt-2'>
              {children}
            </M>
          ),
          h4: ({ children }) => <H4>{children}</H4>,
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
          a: ({ children, href, ...rest }) => (
            <a
              href={href}
              {...rest}
              className='text-accent underline underline-offset-4 hover:no-underline transition-all duration-200'
            >
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className='relative rounded-sm px-[0.3rem] py-[0.2rem] font-mono text-[0.9em] font-semibold'>
              {children}
            </code>
          ),
          strong: ({ children }) => (
            <M as='strong' className='font-bold'>
              {children}
            </M>
          ),
          b: ({ children }) => (
            <M as='strong' className='font-bold'>
              {children}
            </M>
          ),
          em: ({ children }) => <em className='italic'>{children}</em>,
          highlight: ({ children }) => (
            <M as='span' className='font-bold bg-accent-foreground text-accent-foreground px-1'>
              {children}
            </M>
          )
        }}
      >
        {children}
      </RichText>
    </article>
  );
};
