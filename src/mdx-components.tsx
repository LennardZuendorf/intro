/**
 * MDX components map consumed by Fumadocs `<MDXContent components={...}>`.
 * Element overrides (h1–h6, p, ul, ol, li, hr, a, code, b, strong, em, img, blockquote)
 * map HTML elements to typography components. Custom components (`<Project>`,
 * `<Experience>`, `<HoverLink>`, `<Callout>`, `<Highlight>`) live in
 * `src/components/shared/richtext/mdx-blocks.tsx`.
 */

import Image from 'next/image';
import NextLink from 'next/link';
import type { ComponentType, ReactNode } from 'react';

/**
 * MDX components map shape. We avoid `mdx/types` (not in this dep tree); a
 * permissive shape matches what Fumadocs `<MDXContent components={...}>`
 * expects without coupling to the upstream `MDXComponents` type. Each entry
 * accepts an arbitrary prop bag (h1 with `id`, `a` with `href`, custom
 * `<Project slug>` etc.) — mirrors `mdx/types`'s
 * `MDXComponents = Record<string, FC<any>>`.
 */
// biome-ignore lint/suspicious/noExplicitAny: MDX components accept arbitrary prop bags (different per element).
type AnyComponent = ComponentType<any>;
export type MDXComponents = Record<string, AnyComponent>;

import { Callout, Experience, HoverLink, Project } from '@/components/shared/richtext/mdx-blocks';
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
import { isExternalUrl } from '@/lib/utils/ui';

// ---------- heading helpers (port from richtext-block.tsx) ----------

// H1–H3 receive an anchor link to their `id`; H4–H6 are style-only.
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
      <NextLink href={`#${id}`} color='default' className='text-inherit hover:underline'>
        {children}
      </NextLink>
    </HeadingComponent>
  );
};

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

// ---------- Highlight (replaces BaseHub `highlight` rich-text mark) ----------

const Highlight = ({ children }: { children: ReactNode }) => (
  <M as='span' className='font-bold bg-accent text-accent-foreground px-1'>
    {children}
  </M>
);

// ---------- map factory ----------

/**
 * Returns the MDX components map. Pass extra `components` to merge per-route
 * overrides (Fumadocs convention).
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    // ----- HTML element overrides -----
    h1: (props: { id?: string; children: ReactNode }) => (
      <Heading as='h1' id={props.id}>
        {props.children}
      </Heading>
    ),
    h2: (props: { id?: string; children: ReactNode }) => (
      <Heading as='h2' id={props.id}>
        {props.children}
      </Heading>
    ),
    h3: (props: { id?: string; children: ReactNode }) => (
      <Heading as='h3' id={props.id}>
        {props.children}
      </Heading>
    ),
    h4: (props: { id?: string; children: ReactNode }) => (
      <HeadingNoLink as='h4' id={props.id}>
        {props.children}
      </HeadingNoLink>
    ),
    h5: (props: { id?: string; children: ReactNode }) => (
      <HeadingNoLink as='h5' id={props.id}>
        {props.children}
      </HeadingNoLink>
    ),
    h6: (props: { id?: string; children: ReactNode }) => (
      <HeadingNoLink as='h6' id={props.id}>
        {props.children}
      </HeadingNoLink>
    ),
    p: ({ children }: { children: ReactNode }) => (
      <M as='div' className='first:mt-0 mt-5 leading-[inherit] text-inherit'>
        {children}
      </M>
    ),
    blockquote: ({ children }: { children: ReactNode }) => (
      <Quote className='my-5'>{children}</Quote>
    ),
    ul: ({ children }: { children: ReactNode }) => (
      <ul className='my-3 ml-5 list-disc space-y-2'>{children}</ul>
    ),
    ol: ({ children }: { children: ReactNode }) => (
      <ol className='my-3 ml-5 list-decimal space-y-2'>{children}</ol>
    ),
    li: ({ children }: { children: ReactNode }) => (
      <li className='[&>div]:m-0'>
        <M as='div' className='mt-0'>
          {children}
        </M>
      </li>
    ),
    hr: () => <hr className='my-7 border-t-2 border-border' />,
    a: ({
      children,
      href,
      ...rest
    }: {
      children: ReactNode;
      href?: string;
      [key: string]: unknown;
    }) => {
      const isExternal = isExternalUrl(href);
      return (
        <Link href={href || '#'} external={isExternal} {...rest}>
          {children}
        </Link>
      );
    },
    code: ({ children }: { children: ReactNode }) => <Code variant='soft'>{children}</Code>,
    b: ({ children }: { children: ReactNode }) => <Strong>{children}</Strong>,
    strong: ({ children }: { children: ReactNode }) => <Strong>{children}</Strong>,
    em: ({ children }: { children: ReactNode }) => <Em>{children}</Em>,
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

    // ----- Custom MDX components -----
    Project,
    Experience,
    HoverLink,
    Callout,
    Highlight,

    // Caller-supplied overrides win.
    ...components
  };
}
