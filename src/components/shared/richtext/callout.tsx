'use client';

import { RichText } from 'basehub/react-rich-text';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  PencilIcon,
  TriangleAlertIcon
} from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import * as React from 'react';
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

export type CalloutType = 'info' | 'check' | 'warning' | 'danger' | 'note';

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  disableScale?: boolean;
  type?: CalloutType;
}

const calloutVariants = cva(
  'rounded-md border-4 border-border text-primary-foreground shadow-black shadow-md transition-all',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        reversed: 'bg-primary',
        outline: 'bg-transparent',
        accent: 'bg-accent text-accent-foreground',
        info: 'bg-primary border-border',
        check: 'bg-primary border-border',
        warning: 'bg-primary border-border',
        danger: 'bg-primary border-border',
        note: 'bg-primary border-border'
      },
      borderStyle: {
        default: 'border-4 border-border',
        accent: 'border-4 border-accent',
        none: 'border-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      borderStyle: 'default'
    }
  }
);

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, borderStyle, disableScale = false, type, ...props }, ref) => {
    // If type is provided, use it as variant; otherwise use provided variant
    const finalVariant = type ? (type as CalloutProps['variant']) : variant;

    return (
      <div
        ref={ref}
        className={cn(
          !disableScale && 'scale-100',
          calloutVariants({ variant: finalVariant, borderStyle }),
          className
        )}
        {...props}
      />
    );
  }
);
Callout.displayName = 'Callout';

const CalloutIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { type?: CalloutType }
>(({ className, type, ...props }, ref) => (
  <div ref={ref} className={cn('flex-shrink-0', className)} {...props} />
));
CalloutIcon.displayName = 'CalloutIcon';

const CalloutHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-4 pt-6', className)} {...props} />
  )
);
CalloutHeader.displayName = 'CalloutHeader';

const CalloutTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-xl leading-none font-heading tracking-tight', className)}
    {...props}
  />
));
CalloutTitle.displayName = 'CalloutTitle';

const CalloutDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-primary-foreground font-base !mt-3 text-center', className)}
    {...props}
  />
));
CalloutDescription.displayName = 'CalloutDescription';

const CalloutContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-4', className)} {...props} />
);
CalloutContent.displayName = 'CalloutContent';

const CalloutFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-center p-2 pt-0', className)}
      {...props}
    />
  )
);
CalloutFooter.displayName = 'CalloutFooter';

export {
  Callout,
  calloutVariants,
  CalloutHeader,
  CalloutFooter,
  CalloutTitle,
  CalloutDescription,
  CalloutContent,
  CalloutIcon
};

// RichText components configuration (shared with RichTextBlock)
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
  return <H6 id={id}>{children}</H6>;
};

const richTextComponents = {
  img: (props: { src?: string; alt?: string; [key: string]: unknown }) => (
    <Image
      src={props.src || ''}
      alt={props.alt || ''}
      width={800}
      height={400}
      className='rounded-lg border-2 border-black dark:border-white my-4'
    />
  ),
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
    <M as='div' className='first:mt-0 mt-2'>
      {children}
    </M>
  ),
  blockquote: ({ children }: { children: ReactNode }) => <Quote className='my-4'>{children}</Quote>,
  ul: ({ children }: { children: ReactNode }) => (
    <ul className='my-2 ml-5 list-disc space-y-1'>{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className='my-2 ml-5 list-decimal space-y-1'>{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className='[&>div]:m-0'>
      <M as='div' className='mt-0'>
        {children}
      </M>
    </li>
  ),
  hr: () => <hr className='my-6 border-t-2 border-border' />,
  a: ({
    children,
    href,
    ...rest
  }: {
    children: ReactNode;
    href?: string;
    [key: string]: unknown;
  }) => {
    const isExternal = href?.startsWith('http') || href?.startsWith('//');
    return (
      <Link href={href || '#'} external={isExternal} underline='hover' {...rest}>
        {children}
      </Link>
    );
  },
  code: ({ children }: { children: ReactNode }) => <Code variant='soft'>{children}</Code>,
  strong: ({ children }: { children: ReactNode }) => <Strong>{children}</Strong>,
  b: ({ children }: { children: ReactNode }) => <Strong>{children}</Strong>,
  em: ({ children }: { children: ReactNode }) => <Em>{children}</Em>,
  highlight: ({ children }: { children: ReactNode }) => (
    <M as='span' className='font-bold bg-accent text-accent-foreground px-1'>
      {children}
    </M>
  )
};

const getCalloutIcon = (type: CalloutType) => {
  switch (type) {
    case 'info':
      return <InfoIcon className='w-5 h-5' />;
    case 'check':
      return <CircleCheckIcon className='w-5 h-5' />;
    case 'warning':
      return <TriangleAlertIcon className='w-5 h-5' />;
    case 'danger':
      return <OctagonXIcon className='w-5 h-5' />;
    case 'note':
      return <PencilIcon className='w-5 h-5' />;
    default:
      return <InfoIcon className='w-5 h-5' />;
  }
};

import type { UnionCalloutComponentComponent } from 'basehub-types';

export interface CalloutComponentProps {
  type?: CalloutType | null;
  title?: string | null;
  content?: {
    json?: {
      content?: unknown;
      blocks?: UnionCalloutComponentComponent[];
    };
  } | null;
  _id?: string;
  __typename?: string;
}

export const CalloutComponent = ({ type = 'info', title, content }: CalloutComponentProps) => {
  const calloutType: CalloutType = type || 'info';
  const richTextJson = content?.json;
  const hasContent =
    richTextJson &&
    typeof richTextJson === 'object' &&
    'content' in (richTextJson as Record<string, unknown>);

  return (
    <Callout
      type={calloutType}
      className={cn('my-4', 'text-left')}
      data-type='callout'
      data-callout-type={calloutType}
    >
      {title ? (
        <CalloutHeader className='flex items-center gap-3'>
          <CalloutIcon type={calloutType} className='flex-shrink-0'>
            {getCalloutIcon(calloutType)}
            <span className='sr-only'>{calloutType}: </span>
          </CalloutIcon>
          <CalloutTitle>{title}</CalloutTitle>
        </CalloutHeader>
      ) : null}
      <CalloutContent className={cn('flex gap-3', !title && 'pt-6')}>
        {!title && (
          <CalloutIcon type={calloutType} className='mt-1 flex-shrink-0'>
            {getCalloutIcon(calloutType)}
            <span className='sr-only'>{calloutType}: </span>
          </CalloutIcon>
        )}
        <div className='flex-1'>
          {hasContent &&
            richTextJson &&
            typeof richTextJson === 'object' &&
            'blocks' in richTextJson &&
            'content' in richTextJson &&
            Array.isArray(richTextJson.blocks) && (
              <RichText blocks={richTextJson.blocks} components={richTextComponents}>
                {richTextJson.content as ReactNode}
              </RichText>
            )}
        </div>
      </CalloutContent>
    </Callout>
  );
};
