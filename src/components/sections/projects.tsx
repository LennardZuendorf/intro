import type { SectionProps } from '@/app/(app)/page';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NeoBadge } from '@/components/ui/neoBadge';
import { Section, SectionTop } from '@/components/ui/section';
import { Code, H4, S } from '@/components/ui/typography';
import { cn } from '@/lib/utils/ui';
import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import ProjectCarousel from '../custom/project-carousel';
import { TechStackCompact } from '../shared/tech-stack';

export async function Projects({ className }: SectionProps) {
  const payloadProjects = await queryProjects();

  return (
    <section id='projects'>
      <Section
        className={cn('relative overflow-hidden', className)}
        background='default'
        width='lg'
        centerContent={true}
        fullHeight={false}
        padding='py-14 md:py-24 px-6 py-8 md:py-12 2xl:py-16'
        gap='md'
      >
        <SectionTop>
          {/* Project carousel with transparent wrapper */}
          <div className='w-full relative flex justify-center'>
            <Card
              className='relative w-full'
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
              <CardContent className='py-5 px-0'>
                {/* Project carousel with horizontal layout */}
                {payloadProjects && payloadProjects.length > 0 ? (
                  <ProjectCarousel projects={payloadProjects} visibleCount={4} />
                ) : (
                  <div className='flex items-center justify-center h-32'>
                    <S className='text-muted-foreground'>No projects available</S>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tech Stack Section */}
          <div className='w-full flex flex-col items-center'>
            <H4 className='font-mono uppercase tracking-wider mb-4 text-center'>Tech Stack</H4>
            <div className='flex justify-center w-full'>
              <TechStackCompact />
            </div>
          </div>
        </SectionTop>
      </Section>
    </section>
  );
}

const queryProjects = async () => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  try {
    // 1. Fetch all projects (expecting only technology IDs)
    const projectsResult = await payload.find({
      collection: 'projects',
      overrideAccess: draft,
      pagination: false,
      depth: 2, //Needs to 2 to get the Picture Data
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        heroImage: true,
        technologies: true,
        liveUrl: true,
        repoUrl: true
      },
      where: {
        _status: {
          equals: 'published'
        }
      }
    });

    console.log(
      'Projects with technology IDs:',
      projectsResult.docs.map((p) => ({
        title: p.title,
        technologies: p.technologies
      }))
    );

    // 2. Collect all unique technology IDs from all projects
    const allTechIds = new Set<number>();
    for (const project of projectsResult.docs) {
      if (project.technologies && Array.isArray(project.technologies)) {
        for (const techId of project.technologies) {
          if (typeof techId === 'number') {
            allTechIds.add(techId);
          }
        }
      }
    }

    console.log('Unique technology IDs to fetch:', Array.from(allTechIds));

    // 3. Fetch ALL techstack tags in a single query
    const techstackResult = await payload.find({
      collection: 'tag',
      where: {
        id: {
          in: Array.from(allTechIds)
        },
        type: {
          equals: 'techstack'
        }
      },
      depth: 0,
      pagination: false
    });

    console.log(
      'Fetched techstack tags:',
      techstackResult.docs.map((t) => ({ id: t.id, name: t.name }))
    );

    // 4. Create a lookup map for O(1) technology assignment
    const techLookup = new Map();
    for (const tech of techstackResult.docs) {
      techLookup.set(tech.id, tech);
    }

    // 5. Map technologies to projects
    const projectsWithTechnologies = projectsResult.docs.map((project) => {
      if (project.technologies && Array.isArray(project.technologies)) {
        const populatedTechnologies = project.technologies
          .map((techId) => {
            if (typeof techId === 'number') {
              return techLookup.get(techId) || null;
            }
            return null;
          })
          .filter((tech) => tech !== null);

        return {
          ...project,
          technologies: populatedTechnologies
        };
      }
      return project;
    });

    console.log(
      'Final projects with populated technologies:',
      projectsWithTechnologies.map((p) => ({
        title: p.title,
        technologies: p.technologies?.map((t) => t.name)
      }))
    );

    return projectsWithTechnologies;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
};
