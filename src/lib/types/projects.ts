/** Project shape — mirrors the zod schema from `source.config.ts` for the `projects` collection. */
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
