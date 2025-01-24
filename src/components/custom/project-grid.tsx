import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';

// Example data for projects
const projects = [
  {
    name: 'Project A',
    description: 'An innovative project that solves problem X.',
    link: 'https://example.com/project-a',
    image: '/images/project-a.png', // Add a valid image path
    background: 'bg-blue-500', // Example background class
    cta: 'Learn More' // Call-to-action text
  },
  {
    name: 'Project B',
    description: 'A cutting-edge tool for Y.',
    link: 'https://example.com/project-b',
    image: '/images/project-b.png',
    background: 'bg-green-500',
    cta: 'Discover'
  },
  {
    name: 'Project C',
    description: 'A simple app that helps with Z.',
    link: 'https://example.com/project-c',
    image: '/images/project-c.png',
    background: 'bg-yellow-500',
    cta: 'Try Now'
  }
];

export default function ProjectGrid() {
  return (
    <div className='w-full md:w-[98%] mx-auto max-sm:w-[98%]'>
      <div className='md:w-[90%] lg:w-[65%] mx-auto max-md:px-5'>
        <h1 className='text-7xl max-xl:text-6xl max-sm:text-5xl m-5 xl:mt-32'>Projects</h1>
      </div>
      <div className='transition-all duration-500 ease-in-out'>
        <BentoGrid className='grid-cols-2 grid-rows-6 h-[800px] md:grid-rows-4 md:grid-cols-4 md:h-[900px] gap-2'>
          {projects.map((project) => (
            <BentoCard
              key={project.name}
              name={project.name}
              description={project.description}
              href={project.link}
              background={project.background}
              cta={project.cta}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
}
