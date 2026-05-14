/**
 * MDX block components — async RSC wrappers that resolve content from the
 * Fumadocs source loaders and render hover cards inline in MDX bodies.
 */

import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  PencilIcon,
  TriangleAlertIcon
} from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Callout as CalloutBox,
  CalloutContent,
  CalloutHeader,
  CalloutIcon,
  CalloutTitle,
  type CalloutType
} from '@/components/shared/richtext/callout';
import {
  ExperienceHoverCard,
  type ExperienceHoverCardProps
} from '@/components/shared/richtext/experience-hover-card';
import { LinkHoverCard } from '@/components/shared/richtext/link-hover-card';
import {
  ProjectHoverCard,
  type ProjectHoverCardProps
} from '@/components/shared/richtext/project-hover-card';
import { experienceSource, projectSource } from '@/lib/source';
import { cn } from '@/lib/utils/ui';

// ---------- HoverLink ----------

interface HoverLinkProps {
  url?: string | null;
  title?: string | null;
  description?: string | null;
  text?: string | null;
}

/**
 * MDX adapter for inline rich-text links with a hover card preview.
 * Translates the MDX prop shape (`title`) to the legacy hover card prop
 * shape (`_title`).
 */
export function HoverLink({ url, title, description, text }: HoverLinkProps) {
  return <LinkHoverCard url={url} _title={title} description={description} text={text} />;
}

// ---------- Project ----------

interface ProjectProps {
  slug: string;
}

export async function Project({ slug }: ProjectProps) {
  const page = projectSource.getPage([slug]);
  if (!page) return null;

  const data = page.data;
  const card: ProjectHoverCardProps = {
    _id: data._slug ?? page.slugs.join('/') ?? slug,
    _title: data._title,
    _slug: data._slug ?? slug,
    shortDescription: data.shortDescription,
    color: data.color,
    technology: data.technology,
    links: data.links,
    extendedPreview: data.extendedPreview
  };
  return <ProjectHoverCard {...card} />;
}

// ---------- Experience ----------

interface ExperienceProps {
  slug: string;
}

export async function Experience({ slug }: ExperienceProps) {
  const page = experienceSource.getPage([slug]);
  if (!page) return null;

  const data = page.data;
  // `startDate`/`endDate` arrive as `Date` from zod `coerce.date()`; serialise
  // to ISO string for the hover card which calls `new Date(string)`.
  const props: ExperienceHoverCardProps = {
    _id: data._slug ?? page.slugs.join('/') ?? slug,
    _title: data._title,
    _slug: data._slug ?? slug,
    companyTitle: data.companyTitle ?? null,
    companyLink: data.companyLink,
    shortDescription: data.shortDescription,
    startDate: data.startDate instanceof Date ? data.startDate.toISOString() : data.startDate,
    endDate: data.endDate instanceof Date ? data.endDate.toISOString() : (data.endDate ?? null),
    skills: data.skills
  };
  return <ExperienceHoverCard {...props} />;
}

// ---------- Callout ----------

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const calloutIconFor = (type: CalloutType) => {
  switch (type) {
    case 'info':
      return <InfoIcon className='w-4 h-4' />;
    case 'check':
      return <CircleCheckIcon className='w-4 h-4' />;
    case 'warning':
      return <TriangleAlertIcon className='w-4 h-4' />;
    case 'danger':
      return <OctagonXIcon className='w-4 h-4' />;
    case 'note':
      return <PencilIcon className='w-4 h-4' />;
    default:
      return <InfoIcon className='w-4 h-4' />;
  }
};

/**
 * MDX-facing Callout. Composes the visual primitives exported from
 * `callout.tsx` and renders MDX `children` directly (no nested `<RichText>`).
 */
export function Callout({ type = 'info', title, children }: CalloutProps) {
  const calloutType: CalloutType = type;
  return (
    <CalloutBox
      type={calloutType}
      className={cn('my-4', 'text-left')}
      data-type='callout'
      data-callout-type={calloutType}
    >
      {title ? (
        <CalloutHeader className='flex flex-row items-center gap-2'>
          <CalloutIcon type={calloutType} className='shrink-0'>
            {calloutIconFor(calloutType)}
            <span className='sr-only'>{calloutType}: </span>
          </CalloutIcon>
          <CalloutTitle>{title}</CalloutTitle>
        </CalloutHeader>
      ) : null}
      <CalloutContent className={cn('flex gap-2', !title && 'pt-3')}>
        {!title && (
          <CalloutIcon type={calloutType} className='mt-0.5 shrink-0'>
            {calloutIconFor(calloutType)}
            <span className='sr-only'>{calloutType}: </span>
          </CalloutIcon>
        )}
        <div className='flex-1'>{children}</div>
      </CalloutContent>
    </CalloutBox>
  );
}
