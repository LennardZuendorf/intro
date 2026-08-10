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
import type { CalloutType } from '@/components/shared/richtext/callout';
import {
  ExperienceHoverCard,
  type ExperienceHoverCardProps
} from '@/components/shared/richtext/experience-hover-card';
import { LinkHoverCard } from '@/components/shared/richtext/link-hover-card';
import {
  ProjectHoverCard,
  type ProjectHoverCardProps
} from '@/components/shared/richtext/project-hover-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { experienceSource, projectSource } from '@/lib/source';
import { cn } from '@/lib/utils/ui';

// ---------- HoverLink ----------

interface HoverLinkProps {
  url?: string | null;
  title?: string | null;
  description?: string | null;
  text?: string | null;
}

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

const calloutStatusFor = (type: CalloutType) => {
  switch (type) {
    case 'check':
      return 'success' as const;
    case 'warning':
      return 'warning' as const;
    case 'danger':
      return 'error' as const;
    case 'info':
      return 'info' as const;
    default:
      return undefined;
  }
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const calloutType: CalloutType = type;

  return (
    <Alert
      status={calloutStatusFor(calloutType)}
      className={cn('my-4 text-left')}
      data-type='callout'
      data-callout-type={calloutType}
    >
      {title ? (
        <>
          {calloutIconFor(calloutType)}
          <AlertTitle>{title}</AlertTitle>
        </>
      ) : (
        calloutIconFor(calloutType)
      )}
      <AlertDescription className={cn(!title && 'col-start-2')}>{children}</AlertDescription>
    </Alert>
  );
}
