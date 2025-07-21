import type { Experience } from '@/payload-types';

import { tags } from './tagContent';

// Experience fallback data in PayloadCMS format
export const experienceData: Experience[] = [
  {
    id: 1,
    company: 'CHECK24 - Flug',
    position: 'Professional Product Manager Payment | Backend',
    startDate: '2024-03-01T00:00:00.000Z',
    endDate: null, // Still working here
    skills: [
      tags[4], // Product Management
      tags[5], // Agile/Scrum
      tags[6], // Payment Systems
      tags[7], // Backend Development
      tags[8] // Quality Assurance
    ],
    description:
      'CHECK24 Vergleichsportal Flug is the digital flight comparison and online travel agency for flights of the CHECK24 Group. Check24 Flug is one of the leading online travel agencies for flights in the DACH region.',
    responsibilityOne:
      'Independently conceiving, guiding implementation, testing, and managing the launch of product features for payments.',
    responsibilityTwo:
      'Taking charge of regular product operational processes, quality assurance, functionality testing, and cooperating in managing weekly product updates.',
    responsibilityThree:
      'Agile sprint management and support in regular Scrum ceremonies in close collaboration with the product management and IT teams.',
    updatedAt: '2024-03-01T00:00:00.000Z',
    createdAt: '2024-03-01T00:00:00.000Z',
    url: 'https://flug.check24.de'
  },
  {
    id: 2,
    company: 'CHECK24 - Flug',
    position: 'Student Product Manager',
    startDate: '2023-09-01T00:00:00.000Z',
    endDate: '2024-03-01T00:00:00.000Z',
    skills: [
      tags[4], // Product Management
      tags[5], // Agile/Scrum
      tags[9], // Release Management
      tags[10], // Testing
      tags[11] // Payment Architecture
    ],
    description:
      'CHECK24 Vergleichsportal Flug is the digital flight comparison and online travel agency for flights of the CHECK24 Group. Check24 Flug is one of the leading online travel agencies for flights in the DACH region.',
    responsibilityOne:
      'Testing, guiding the final implementation, and organizing the launch of payment features (including risk management and changes to the payment architecture).',
    responsibilityTwo:
      'Agile sprint management of the Backend Team in collaboration with the Lead Product Manager and the IT Lead.',
    responsibilityThree:
      'Release management, testing, and quality assurance of weekly product updates.',
    updatedAt: '2023-09-01T00:00:00.000Z',
    createdAt: '2023-09-01T00:00:00.000Z',
    url: 'https://flug.check24.de'
  },
  {
    id: 3,
    company: 'Hypoport - Insurance Segment',
    position: 'Product Strategy Intern',
    startDate: '2022-08-01T00:00:00.000Z',
    endDate: '2023-02-28T00:00:00.000Z',
    skills: [
      tags[8], // Product Strategy
      tags[9], // Software Development
      tags[10], // Product Analysis
      tags[11], // Research
      tags[12] // Strategic Planning
    ],
    description:
      'Hypoport is the largest publicly traded Fintech/Insurtech/Proptech group of companies. At the holding level, the Insurance Segment CPO leads and supports product teams across InsurTech companies by optimizing product development, devising effective product strategies, and driving successful implementation.',
    responsibilityOne:
      'Supported product management of a subsidiaries new software development project.',
    responsibilityTwo: 'Led product analysis for the next software generation.',
    responsibilityThree:
      'Supported product strategy in the segment through analysis, research, conception, and execution with the CPO.',
    updatedAt: '2022-08-01T00:00:00.000Z',
    createdAt: '2022-08-01T00:00:00.000Z',
    url: 'https://hypoport.de'
  },
  {
    id: 4,
    company: 'Hypoport - Step Innovation Hub',
    position: 'Innovation Manager (Working Student)',
    startDate: '2019-05-01T00:00:00.000Z',
    endDate: '2021-09-30T00:00:00.000Z',
    skills: [
      tags[13], // Innovation Management
      tags[14], // Business Development
      tags[15], // Customer Research
      tags[16], // Operations Management
      tags[12] // Strategic Planning
    ],
    description:
      'Step was the Innovation Hub of the Hypoport Group and was part of Hypoport SE until 2022, where opportunities for new products, business models, and technologies were explored collaboratively with subsidiary companies, and their implementation was supported.',
    responsibilityOne:
      'Set up and led internal governance, tooling, and operations, and ran administrative activities of the hub.',
    responsibilityTwo:
      'Supported innovation processes through customer research as well as research & intelligence.',
    responsibilityThree:
      'Was involved in numerous new venture development cases and ran the internal business case development tool.',
    updatedAt: '2019-05-01T00:00:00.000Z',
    createdAt: '2019-05-01T00:00:00.000Z',
    url: 'https://hypoport.de'
  }
];
