export interface NavSection {
  /** DOM element id to scroll into view (home page sections). */
  id?: string;
  /** Route to navigate to (e.g. legal). */
  href?: string;
  /** Short display label shown in the palette and dock. */
  label: string;
  /** One-line description shown as palette item subtitle. */
  blurb: string;
  /** Single-character shortcut hint displayed in the palette item. */
  n: string;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'about',
    label: 'About',
    blurb: 'Background, skills, and a few facts about me.',
    n: '1'
  },
  {
    id: 'work',
    label: 'Work',
    blurb: 'Selected projects and things I have shipped.',
    n: '2'
  },
  {
    id: 'notes',
    label: 'Notes',
    blurb: 'Writing, experiments, and short-form thoughts.',
    n: '3'
  },
  {
    id: 'contact',
    label: 'Contact',
    blurb: 'Get in touch or find me elsewhere on the web.',
    n: '4'
  },
  {
    href: '/legal',
    label: 'Legal',
    blurb: 'Privacy policy and legal notice.',
    n: '5'
  }
];
