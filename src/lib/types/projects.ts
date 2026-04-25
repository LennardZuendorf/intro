/**
 * Local project shape — mirrors the zod schema from `source.config.ts` for the
 * `projects` collection. Replaces the previous BaseHub `ProjectComponent`
 * dependency. Field shape is preserved 1:1 so the animated cards
 * (`stride.tsx`, `indexed.tsx`, `shards.tsx`) and the `ProjectHoverCard`
 * consumer continue to read the same field names without changes.
 */
export interface ProjectShape {
  _id?: string;
  _title: string;
  _slug?: string;
  shortDescription: string;
  color: { hex: string };
  technology: { _id?: string; _title: string }[];
  links: { items: { _id?: string; _title: string; url: string }[] };
  extendedPreview: boolean;
}

export type ProjectData = ProjectShape & {
  showcaseLink?: string;
};
