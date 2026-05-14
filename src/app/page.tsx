import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { Banner } from '@/components/banner';
import { Nav } from '@/components/navbar';
import { Card } from '@/components/retroui/Card';
import { BackgroundGrid } from '@/components/ui/background-grid';
import { Section, SectionHeader } from '@/components/ui/section';
import { socials } from '@/lib/socials';
import { homeSource } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

const Page: NextPage = async () => {
  const introPage = homeSource.getPage([]);
  const projectsPage = homeSource.getPage(['projects']);

  if (!introPage || !projectsPage) {
    notFound();
  }

  const IntroBody = introPage.data.body;
  const ProjectsBody = projectsPage.data.body;
  const components = getMDXComponents();

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
          <div className='flex w-full max-w-full flex-col gap-10 md:gap-14'>
            <Card className='block w-full max-w-full text-left'>
              <Card.Content>
                <IntroBody components={components} />
              </Card.Content>
            </Card>
            <Card className='block w-full max-w-full text-left'>
              <Card.Header>
                <Card.Title>Side projects</Card.Title>
              </Card.Header>
              <Card.Content>
                <ProjectsBody components={components} />
              </Card.Content>
            </Card>
          </div>
        </SectionHeader>
      </Section>

      <Banner />
    </BackgroundGrid>
  );
};

export default Page;
