import { notFound } from 'next/navigation';
import { Banner } from '@/components/banner';
import { Nav } from '@/components/navbar';
import { Section, SectionHeader } from '@/components/ui/section';
import { socials } from '@/lib/socials';
import { legalSource } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

const supported = new Set(['en', 'de']);

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'de' }];
}

export default async function LegalLangPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!supported.has(lang)) {
    notFound();
  }

  const page = legalSource.getPage([lang]);

  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;

  return (
    <div className='flex w-full min-h-screen flex-col relative justify-center items-center'>
      <div className='w-full flex justify-center fixed bottom-0 md:bottom-auto md:top-0 left-0 z-9999 pointer-events-none'>
        <div className='pointer-events-auto w-full max-w-[1536px] px-2 md:px-8 pb-3 md:pb-0 md:pt-3'>
          <Nav socials={[...socials]} backHref='/' />
        </div>
      </div>

      <Section
        id='data-protection'
        centerContent={false}
        fullHeight={false}
        className='pt-20 md:pt-24'
      >
        <SectionHeader badge='Legal'>
          <MDXContent components={getMDXComponents()} />
        </SectionHeader>
      </Section>

      <Banner />
    </div>
  );
}
