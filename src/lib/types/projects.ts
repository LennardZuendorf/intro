// Shared ProjectData type that matches BaseHub query structure
export type ProjectData = {
  _id: string;
  _title: string;
  _slug: string;
  shortDescription?: string | null;
  date?: string | null;
  showcaseLink?: string | null;
  meta?: {
    title?: string | null;
    desc?: string | null;
  } | null;
  technology?:
    | {
        _id: string;
        _title: string;
        url?: string | null;
        badgeUrl?: string | null;
      }[]
    | null;
  color?: {
    hex?: string | null;
    rgb?: string | null;
    hsl?: string | null;
  } | null;
};
