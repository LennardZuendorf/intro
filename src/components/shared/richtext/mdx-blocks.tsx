/**
 * MDX block components.
 *
 * These wrappers adapt MDX-prop shapes (e.g. `<Project slug="stride"/>`) to the
 * existing hover-card/animated-card components. Each `<Project>` / `<Experience>`
 * is an async RSC that resolves its own data via the Fumadocs source loader —
 * a single source of truth per slug, replacing BaseHub's parallel `blocks[]`
 * channel.
 *
 * The 3D animated project cards (`StrideAnimatedCard`, `IndexedAnimatedCard`,
 * `ShardsAnimatedCard`) are preserved 1:1 — `<Project>` dispatches by `_slug`
 * exactly like the legacy `project-card.tsx`.
 *
 * No route consumes these yet (U5 unit). U6/U7 will wire them in.
 */

import {
  CircleCheckIcon,
  InfoIcon,
  OctagonXIcon,
  PencilIcon,
  TriangleAlertIcon
} from 'lucide-react';
import type { ReactNode } from 'react';
import { IndexedAnimatedCard } from '@/components/sections/components/projects/indexed';
import { ShardsAnimatedCard } from '@/components/sections/components/projects/shards';
import { StrideAnimatedCard } from '@/components/sections/components/projects/stride';
import {
  Callout as CalloutBox,
  CalloutContent,
  CalloutHeader,
  CalloutIcon,
  CalloutTitle,
  type CalloutType
} from '@/components/shared/richtext/callout';
import { ExperienceHoverCard } from '@/components/shared/richtext/experience-hover-card';
import { LinkHoverCard } from '@/components/shared/richtext/link-hover-card';
import { ProjectHoverCard } from '@/components/shared/richtext/project-hover-card';
import { experienceSource, projectSource } from '@/lib/source';
import { cn } from '@/lib/utils/ui';

// ---------- HoverLink ----------

interface HoverLinkProps {
  url: string;
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

/**
 * MDX adapter for inline project references. Resolves project frontmatter from
 * `content/projects/<slug>.mdx` and dispatches to the per-slug 3D animated
 * card components when one exists, falling back to the generic
 * `ProjectHoverCard` otherwise.
 *
 * Slug → animated-card mapping mirrors the legacy `project-card.tsx`
 * dispatcher exactly (do not drift):
 *   - `stride`        → StrideAnimatedCard
 *   - `indexed`       → IndexedAnimatedCard
 *   - `shards-agent`  → ShardsAnimatedCard
 *   - default         → ProjectHoverCard
 */
export async function Project({ slug }: ProjectProps) {
  const page = projectSource.getPage([slug]);
  if (!page) return null;

  // Animated cards key on `_id` (used to namespace aria-labelledby ids and
  // React keys). Fumadocs frontmatter doesn't carry an explicit `_id`, so
  // synthesise one from the slug — stable and unique per project.
  const data = page.data;
  const projectData = {
    _id: data._slug ?? page.slugs.join('/') ?? slug,
    _title: data._title,
    _slug: data._slug ?? slug,
    shortDescription: data.shortDescription,
    color: data.color,
    technology: data.technology,
    links: data.links,
    extendedPreview: data.extendedPreview
  };

  // The animated cards and `ProjectHoverCard` keep their BaseHub `ProjectData`
  // / `ProjectComponent` type until U12 strips BaseHub. The field shape is
  // structurally identical, but TS sees nominally different types — cast
  // through `unknown` once at the boundary.
  // biome-ignore lint/suspicious/noExplicitAny: structurally compatible cross-package shape.
  const card = projectData as any;

  switch (projectData._slug) {
    case 'stride':
      return <StrideAnimatedCard project={card} />;
    case 'indexed':
      return <IndexedAnimatedCard project={card} />;
    case 'shards-agent':
      return <ShardsAnimatedCard project={card} />;
    default:
      return <ProjectHoverCard {...card} />;
  }
}

// ---------- Experience ----------

interface ExperienceProps {
  slug: string;
}

/**
 * MDX adapter for inline experience references. Resolves experience
 * frontmatter from `content/experience/<slug>.mdx` and renders an
 * `ExperienceHoverCard`.
 */
export async function Experience({ slug }: ExperienceProps) {
  const page = experienceSource.getPage([slug]);
  if (!page) return null;

  const data = page.data;
  // `startDate`/`endDate` arrive as `Date` (zod `coerce.date()`); the legacy
  // hover card formats them via `new Date(...)`, which accepts both `Date` and
  // ISO string. Serialise here for prop-type compatibility.
  const expData = {
    _id: data._slug ?? page.slugs.join('/') ?? slug,
    _title: data._title,
    _slug: data._slug ?? slug,
    companyTitle: data.companyTitle,
    companyLink: data.companyLink,
    shortDescription: data.shortDescription,
    startDate: data.startDate instanceof Date ? data.startDate.toISOString() : data.startDate,
    endDate: data.endDate instanceof Date ? data.endDate.toISOString() : (data.endDate ?? null),
    skills: data.skills
  };

  // Hover card retains its BaseHub `ExperienceComponent` type until U12;
  // shape is structurally compatible.
  // biome-ignore lint/suspicious/noExplicitAny: structurally compatible cross-package shape.
  const props = expData as any;
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
