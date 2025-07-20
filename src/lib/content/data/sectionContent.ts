// Unified fallback data for all sections using PayloadCMS types
import type { SectionContent } from '@/payload-types';

// Create a complete SectionContent fallback that matches PayloadCMS schema
export const sectionContentFallback: SectionContent = {
  id: 0, // Fallback ID
  MainIntroSection: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [
            {
              type: 'text',
              version: 1,
              text: 'a 25-year-old Product Leader based in Berlin, Germany. I leverage my technical expertise to execute product strategy, drive implementation and manage the product.'
            }
          ]
        }
      ],
      direction: null,
      format: '',
      indent: 0,
      version: 1
    }
  },
  MainAboutMeSection: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [
            {
              type: 'text',
              version: 1,
              text: "With a strong foundation in Business Computing and a passion for technology, I bridge the gap between code and commerce. My experience in Innovation Management and Product Strategy has given me a unique perspective that I apply to my product management approach. When I'm not working as a PM, you can find me expanding my skills through language learning and side projects that push my coding abilities."
            }
          ]
        }
      ],
      direction: null,
      format: '',
      indent: 0,
      version: 1
    }
  },
  avatar: null, // Will use default avatar
  selectedProjects: 1, // Will be handled with individual fallback data
  selectedExperiences: 1, // Will be handled with individual fallback data
  quickSkills: [
    { skill: 'Product Management', id: '1' },
    { skill: 'Software Engineering', id: '2' },
    { skill: 'Digital Innovation', id: '3' },
    { skill: 'UX Design', id: '4' }
  ],
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString()
};
