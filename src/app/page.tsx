import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { Dock } from '@/components/nav/dock';
import { ScrollArrow } from '@/components/scroll-arrow';
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
      <Dock socials={[...socials]} />
      <ScrollArrow />
      <ScrollProgress />
      <Hero />
      <AboutSection body={bio} facts={facts} />
      <WorkSection items={workItems} />
      <NotesSection notes={notes} floaty />
      <ContactSection socials={socials} />
    </main>
  );
};

export default Page;
