import { experienceSource, projectSource } from './source';

export type WorkSource = 'project' | 'experience';

export interface WorkItem {
  /** Zero-padded index assigned after sort, e.g. "01", "02". */
  n: string;
  /** Display title (_title frontmatter). */
  title: string;
  /** Human-readable kind label, e.g. "dev tool" / "product" / "role". */
  kind: string;
  /** Four-digit year string, or "ongoing" when no date is available. */
  year: string;
  /** Optional external link (companyLink for experience, first link for projects). */
  href?: string;
  /** Content collection this item came from. */
  source: WorkSource;
}

/**
 * Derives a four-digit year string from a Date or a string/number value.
 * Returns "ongoing" for any missing, invalid, or unresolvable input.
 */
function toYear(value: Date | string | number | null | undefined): string {
  if (value == null) return 'ongoing';
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return 'ongoing';
    return String(value.getFullYear());
  }
  const n = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(n) || n < 1000 || n > 9999) return 'ongoing';
  return String(n);
}

/**
 * Merges projects + experience into a single sorted work list.
 *
 * Sort order: year descending; when years match, experience entries sort
 * before project entries (curated tiebreak — roles precede side projects
 * of the same year). Items without a year sort last as "ongoing".
 */
export function getWorkItems(): WorkItem[] {
  const projectPages = projectSource.getPages();
  const experiencePages = experienceSource.getPages();

  const projectItems: Omit<WorkItem, 'n'>[] = projectPages.map((page) => {
    const data = page.data as {
      _title: string;
      kind?: string;
      year?: string | number;
      links?: { items: { url: string }[] };
    };

    const year = toYear(data.year);
    const kind = data.kind ?? 'project';
    const href = data.links?.items?.[0]?.url;

    return {
      title: data._title,
      kind,
      year,
      href,
      source: 'project' as const
    };
  });

  const experienceItems: Omit<WorkItem, 'n'>[] = experiencePages.map((page) => {
    const data = page.data as {
      _title: string;
      kind?: string;
      startDate?: Date;
      companyLink?: string;
    };

    const year = toYear(data.startDate);
    const kind = data.kind ?? 'role';
    const href = data.companyLink;

    return {
      title: data._title,
      kind,
      year,
      href,
      source: 'experience' as const
    };
  });

  const all = [...projectItems, ...experienceItems];

  // Sort: "ongoing" items always last; otherwise descending by year, with
  // experience before project entries on the same year.
  all.sort((a, b) => {
    const aOngoing = a.year === 'ongoing';
    const bOngoing = b.year === 'ongoing';
    if (aOngoing && bOngoing) return 0;
    if (aOngoing) return 1;
    if (bOngoing) return -1;

    const yearDiff = Number(b.year) - Number(a.year);
    if (yearDiff !== 0) return yearDiff;

    // Same year: experience entries sort before project entries.
    if (a.source === b.source) return 0;
    return a.source === 'experience' ? -1 : 1;
  });

  return all.map((item, i) => ({
    ...item,
    n: String(i + 1).padStart(2, '0')
  }));
}
