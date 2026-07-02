import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { AboutSection } from '@/components/sections/about';
import { ContactSection } from '@/components/sections/contact';
import { Hero } from '@/components/sections/hero';
import { type NoteItem, NotesSection } from '@/components/sections/notes';
import { ScrollProgress } from '@/components/sections/scroll-progress';
import { WorkSection } from '@/components/sections/work';
import { socials } from '@/lib/socials';
import { homeSource, notesSource } from '@/lib/source';
import { getWorkItems } from '@/lib/work';

/**
 * One-page composition (`/`). Server component: it reads every section's data
 * from Fumadocs sources / helpers, then renders the sections in scroll order.
 *
 * Order: hero → about → work → notes → contact (footer is rendered globally by
 * `layout.tsx`, so it is intentionally not composed here — see the layout).
 *
 * `ScrollProgress` is core page chrome: it draws the top progress bar and injects
 * the `data-reveal` scroll-reveal CSS + observer the sections rely on.
 * Navigation chrome (dock/command palette) is a later wave and is not mounted here.
 */
const Page: NextPage = async () => {
  const introPage = homeSource.getPage([]);

  if (!introPage) {
    notFound();
  }

  const bio = introPage.data.body;
  const facts = introPage.data.facts ?? [];
  const workItems = getWorkItems();
  const notes = notesSource.getPages() as NoteItem[];

  return (
    <main>
      <ScrollProgress />
      <Hero />
      <AboutSection body={bio} facts={facts} />
      <WorkSection items={workItems} />
      <NotesSection notes={notes} />
      <ContactSection socials={socials} />
    </main>
  );
};

export default Page;
