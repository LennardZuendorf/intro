import { notFound } from 'next/navigation';
import { Banner } from '@/components/banner';
import { Dock } from '@/components/nav/dock';
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
    <div className='relative flex min-h-screen w-full flex-col items-center justify-center'>
      <Dock socials={[...socials]} backHref='/' />

      <Section
        id='data-protection'
        centerContent={false}
        fullHeight={false}
        className='pt-20 md:pt-24'
      >
        <SectionHeader>
          <MDXContent components={getMDXComponents()} />
        </SectionHeader>
      </Section>

      <Banner />
    </div>
  );
}
