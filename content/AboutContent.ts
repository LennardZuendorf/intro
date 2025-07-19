export const aboutFallbackData: AboutFallbackData = {
  aboutMeText: `With a strong foundation in Business Computing and a passion for technology, I bridge the gap between code and commerce. My experience in Innovation Management and Product Strategy has given me a unique perspective that I apply to my product management approach. When I'm not working as a PM, you can find me expanding my skills through language learning and side projects that push my coding abilities.`,
  skills: [
    'Product Management',
    'Software Engineering',
    'Digital Innovation',
    'Scrum & Kanban',
    'Software Architecture',
    'Product Strategy',
    'Data Science',
    'Machine Learning',
    'UX Design'
  ]
};

export interface AboutFallbackData {
  aboutMeText: string;
  skills: string[];
}

interface Role {
  title: string;
  range: string;
  text: string[];
  skills: string[];
}

interface Experience {
  company: string;
  location: string;
  url: string;
  roles: Role[];
  desc: string;
}

export type ExperienceData = typeof experienceData;
export const experienceData: Experience[] = [
  {
    company: 'CHECK24 - Flug',
    location: 'Berlin, Germany',
    url: 'https://flug.check24.de',
    desc: 'CHECK24 Vergleichsportal Flug is the digital flight comparison and online travel agency for flights of the CHECK24 Group. Check24 Flug is one of the leading online travel agencies for flights in the DACH region.',
    roles: [
      {
        title: 'Professional Product Manager Payment | Backend',
        range: 'March 2024 - ...',
        text: [
          'Independently conceiving, guiding implementation, testing, and managing the launch of product features for payments.',
          'Taking charge of regular product operational processes, quality assurance, functionality testing, and cooperating in managing weekly product updates.',
          'Agile sprint management and support in regular Scrum ceremonies in close collaboration with the product management and IT teams.'
        ],
        skills: [
          'Product Management',
          'Product Ownership',
          'Agile Development',
          'Scrum',
          'Backend Development',
          'Payment Systems',
          'PHP',
          'MySQL',
          'Jira',
          'Grafana'
        ]
      },
      {
        title: 'Student Product Manager',
        range: 'September 2023 - March 2024',
        text: [
          'Testing, guiding the final implementation, and organizing the launch of payment features (including risk management and changes to the payment architecture).',
          'Agile sprint management of the Backend Team in collaboration with the Lead Product Manager and the IT Lead.',
          'Release management, testing, and quality assurance of weekly product updates.'
        ],
        skills: [
          'Product Management',
          'Product Ownership',
          'Agile Development',
          'Scrum',
          'Backend Development',
          'Payment Systems',
          'MySQL',
          'Jira'
        ]
      }
    ]
  },
  {
    company: 'Hypoport - Insurance Segment',
    location: 'Berlin, Germany',
    url: 'https://hypoport.de',
    desc: 'Hypoport is the largest publicly traded Fintech/Insurtech/Proptech group of companies. At the holding level, the Insurance Segment CPO leads and supports product teams across InsurTech companies by optimizing product development, devising effective product strategies, and driving successful implementation.',
    roles: [
      {
        title: 'Product Strategy Intern',
        range: 'August 2022 - Februar 2023',
        text: [
          'Supported product management of a subsidiaries new software development project.',
          'Led product analysis for the next software generation.',
          'Supported product strategy in the segment through analysis, research, conception, and execution with the CPO.'
        ],
        skills: ['Product Management', 'Product Strategy', 'Data Analysis', 'Tableau', 'Scrum']
      }
    ]
  },
  {
    company: 'Hypoport - Step Innovation Hub',
    location: 'Berlin, Germany',
    url: 'https://hypoport.de',
    desc: 'Step was the Innovation Hub of the Hypoport Group and was part of Hypoport SE until 2022, where opportunities for new products, business models, and technologies were explored collaboratively with subsidiary companies, and their implementation was supported.',
    roles: [
      {
        title: 'Innovation Manager (Working Student)',
        range: 'May 2019 - September 2021',
        text: [
          'Set up and led internal governance, tooling, and operations, and ran administrative activities of the hub.',
          'Supported innovation processes through customer research as well as research & intelligence.',
          'Was involved in numerous new venture development cases and ran the internal business case development tool.'
        ],
        skills: [
          'Innovation Management',
          'Business Case and Model Development',
          'Intelligence & Customer Research',
          'Innovation Processes'
        ]
      }
    ]
  }
];

export type techStackData = typeof techStackData;
export const techStackData = [
  {
    name: 'Jira',
    icon: 'jira',
    link: 'https://www.atlassian.com/software/jira'
  },
  {
    name: 'Grafana',
    icon: 'grafana',
    link: 'https://grafana.com/'
  },
  {
    name: 'Typescript',
    icon: 'typescript',
    link: 'https://www.typescriptlang.org/'
  },
  {
    name: 'React.js',
    icon: 'reactjs',
    link: 'https://reactjs.org/'
  },
  {
    name: 'AWS',
    icon: 'aws',
    link: 'https://aws.amazon.com/'
  },
  {
    name: 'Java',
    icon: 'java',
    link: 'https://www.java.com/en/'
  },
  {
    name: 'Python',
    icon: 'python',
    link: 'https://www.python.org/'
  },
  {
    name: 'Docker',
    icon: 'docker',
    link: 'https://www.docker.com/'
  },
  {
    name: 'Figma',
    icon: 'figma',
    link: 'https://www.figma.com/'
  },
  {
    name: 'Huggingface Ecosystem',
    icon: 'huggingface',
    link: 'https://huggingface.co/'
  }
];
