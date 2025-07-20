import type { SectionProps } from '@/app/(app)/page';
import { TechStackCompact } from '@/components/shared/tech-stack';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Section, SectionBottom, SectionTop } from '@/components/ui/section';
import { Code, H4, S } from '@/components/ui/typography';
import { fetchAllProjects } from '@/lib/content/fetchProjects';
import { fetchTechStackTags } from '@/lib/content/fetchTags';
import { cn } from '@/lib/utils/ui';
import ProjectCarousel from './components/project-carousel';
import { ProjectsGrid } from './components/project-grid';

export async function Projects({ className }: SectionProps) {
  const payloadProjects = await fetchAllProjects();
  const techStackTags = await fetchTechStackTags();

  if (!payloadProjects || payloadProjects.length === 0) {
    console.log('No projects found');
    console.log(payloadProjects);
    return null;
  }

  return (
    <section id='projects' className='min-h-screen'>
      <Section
        className={cn('relative overflow-hidden min-h-screen', className)}
        background='secondary'
        fullHeight={true}
      >
        <SectionTop>
          {/* Projects Grid/Carousel */}
          <div className='w-full relative flex flex-col items-center flex-1'>
            <Card
              className='relative w-full flex-1 flex flex-col'
              interactive='none'
              rotation='none'
              shadow='none'
              variant='invisible'
            >
              <CardHeader className='p-5 pb-2 md:p-6 md:pb-2 2xl:p-8 2xl:pb-2'>
                <div className='absolute -top-4 -left-2 md:-top-5 md:-left-3 z-[100]'>
                  <NeoBadge
                    variant='dark'
                    rotation='slight'
                    className='font-mono'
                    interactive='lift'
                  >
                    <Code>Projects</Code>
                  </NeoBadge>
                </div>
              </CardHeader>
              <CardContent className='py-5 px-0 flex-1 flex flex-col'>
                {payloadProjects && payloadProjects.length > 0 ? (
                  <>
                    {/* Desktop/Tablet Grid - Hidden on mobile */}
                    <div className='hidden sm:block flex-1'>
                      <ProjectsGrid projects={payloadProjects} />
                    </div>

                    {/* Mobile Carousel - Hidden on desktop/tablet */}
                    <div className='block sm:hidden flex-1 flex flex-col justify-center'>
                      <ProjectCarousel projects={payloadProjects} visibleCount={1} />
                    </div>
                  </>
                ) : (
                  <div className='flex items-center justify-center h-32'>
                    <S className='text-muted-foreground'>No projects available</S>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </SectionTop>
        <SectionBottom>
          {/* Tech Stack Section */}
          <div className='w-full flex flex-col items-center'>
            <H4 className='font-mono uppercase tracking-wider mb-4 text-center'>Tech Stack</H4>
            <div className='flex justify-center w-full'>
              <TechStackCompact techStackData={techStackTags} />
            </div>
          </div>
        </SectionBottom>
      </Section>
    </section>
  );
}
