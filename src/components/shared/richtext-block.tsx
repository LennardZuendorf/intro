'use client';

import { RichText } from 'basehub/react-rich-text';
import type {
  CalloutComponentComponent,
  ExperienceComponent,
  HoverCardLinkComponent,
  ProjectComponent,
  SkillComponent,
  TechnologyComponent,
  UnionCalloutComponentComponent
} from 'basehub-types';

import Image from 'next/image';

export type RichTextBlockUnion =
  | ExperienceComponent
  | HoverCardLinkComponent
  | ProjectComponent
  | SkillComponent
  | TechnologyComponent;

import NextLink from 'next/link';
import type { ReactNode } from 'react';
import { CalloutComponent, type CalloutComponentProps } from '@/components/shared/richtext/callout';
import { ExperienceHoverCard } from '@/components/shared/richtext/experience-hover-card';
import { LinkHoverCard as HoverCardLink } from '@/components/shared/richtext/link-hover-card';
import { ProjectHoverCard } from '@/components/shared/richtext/project-hover-card';
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
import { cn, isExternalUrl } from '@/lib/utils/ui';

interface RichTextBlockProps {
  children: ReactNode;
  className?: string;
  anchors?: boolean;
  blocks?: (UnionCalloutComponentComponent | RichTextBlockUnion)[];
}

// Only H1-H3 headings get links. H4-H6 do not have anchored links.
const Heading = ({
  as,
  id,
  children,
  anchors = true
}: {
  as: 'h1' | 'h2' | 'h3';
  id?: string;
  children: ReactNode;
  anchors?: boolean;
}) => {
  const HeadingComponent = { h1: H1, h2: H2, h3: H3 }[as];
  const headingClassName = as === 'h1' ? 'font-mono text-balance' : undefined;

  if (!id || !anchors) {
    return <HeadingComponent className={headingClassName}>{children}</HeadingComponent>;
  }

  return (
    <HeadingComponent id={id} className={headingClassName}>
      <NextLink
        href={`#${id}`}
        color='default'
        className='text-inherit hover:underline'
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
      </NextLink>
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
  const Component = { h4: H4, h5: H5, h6: H6 }[as];
  return <Component id={id}>{children}</Component>;
};

export const RichTextBlock = ({
  children,
  className,
  anchors = true,
  blocks
}: RichTextBlockProps) => {
  return (
    <article className={cn('max-w-none text-pretty antialiased', className)}>
      <RichText
        blocks={blocks}
        components={{
          img: (props: { src?: string; alt?: string; [key: string]: unknown }) => (
            <Image
              src={props.src || ''}
              alt={props.alt || ''}
              width={800}
              height={400}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px'
              className='rounded-lg border-2 border-black dark:border-white my-4'
            />
          ),
          h1: (props) => (
            <Heading as='h1' id={props.id} anchors={anchors}>
              {props.children}
            </Heading>
          ),
          h2: (props) => (
            <Heading as='h2' id={props.id} anchors={anchors}>
              {props.children}
            </Heading>
          ),
          h3: (props) => (
            <Heading as='h3' id={props.id} anchors={anchors}>
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
            <M as='div' className='first:mt-0 mt-4 leading-[inherit] text-[inherit]'>
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
            const isExternal = isExternalUrl(href);
            return (
              <Link href={href || '#'} external={isExternal} {...rest}>
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
          CalloutComponentComponent: (props: CalloutComponentComponent) => (
            <CalloutComponent
              type={props.type as CalloutComponentProps['type']}
              title={props.title}
              content={props.content}
              _id={props._id}
              __typename={props.__typename}
            />
          ),
          HoverCardLinkComponent: (props: HoverCardLinkComponent) => (
            <HoverCardLink
              url={props.url}
              _title={props._title}
              description={props.description}
              text={props.text}
              _id={props._id}
              __typename={props.__typename}
            />
          ),
          ProjectComponent: (props: ProjectComponent) => <ProjectHoverCard {...props} />,
          ExperienceComponent: (props: ExperienceComponent) => <ExperienceHoverCard {...props} />
        }}
      >
        {children}
      </RichText>
    </article>
  );
};
