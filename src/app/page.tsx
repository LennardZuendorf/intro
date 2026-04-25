import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { Banner } from '@/components/banner';
import { Nav } from '@/components/navbar';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { Section, SectionHeader } from '@/components/ui/section';
import { socials } from '@/lib/socials';
import { homeSource } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

const Page: NextPage = async () => {
  const page = homeSource.getPage([]);

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <BackgroundGrid
      maskType='radial'
      className='flex w-full min-h-screen flex-col relative justify-center items-center'
    >
      <div className='w-full flex justify-center fixed bottom-0 md:bottom-auto md:top-0 left-0 z-9999 pointer-events-none'>
        <div className='pointer-events-auto w-full max-w-[1536px] px-2 md:px-8 pb-3 md:pb-0 md:pt-3'>
          <Nav socials={[...socials]} />
        </div>
      </div>

      <Section id='hero'>
        <SectionHeader badge='Hey there!' badgeRotation='slight' badgeVariant='default'>
          <MDXContent components={getMDXComponents()} />
        </SectionHeader>
      </Section>

      <Banner />
    </BackgroundGrid>
  );
};

export default Page;
