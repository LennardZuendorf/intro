import { render } from '@testing-library/react';
import AboutSection from '../about';

// Mock title-case package
jest.mock('title-case', () => ({
  titleCase: (str: string) => str
}));

// Mock basehub components
jest.mock('basehub/react-pump', () => ({
  Pump: ({ children }: { children: (data: unknown[]) => React.ReactNode }) =>
    children([{ sectionsAndPages: { aboutSection: {} } }])
}));

interface RichTextChild {
  children?: Array<{ text: string }>;
}

jest.mock('basehub/react-rich-text', () => ({
  RichText: ({ children }: { children: (RichTextChild | string)[] | string }) => (
    <div data-testid='rich-text'>
      {Array.isArray(children)
        ? children.map((child, index) => {
            const childId =
              typeof child === 'object' && 'id' in child
                ? (child as { id?: string }).id
                : `rich-text-child-${index}`;
            return (
              <span key={childId}>
                {typeof child === 'object' && child.children
                  ? child.children.map((c: { text: string }) => c.text).join('')
                  : typeof child === 'string'
                    ? child
                    : 'Rich Text Content'}
              </span>
            );
          })
        : 'Rich Text Content'}
    </div>
  )
}));

// Mock next components
interface MockImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

jest.mock('next/image', () => {
  return function MockImage(props: MockImageProps) {
    return <img {...props} alt={props.alt || 'Mock image'} data-testid='next-image' />;
  };
});

// Mock child components
jest.mock('../components/experience-carousel', () => {
  return function MockExperienceCarousel() {
    return <div data-testid='experience-carousel'>Experience Carousel</div>;
  };
});

jest.mock('../components/skills-showcase', () => {
  return function MockSkillsShowcase() {
    return <div data-testid='skills-showcase'>Skills Showcase</div>;
  };
});

describe('AboutSection', () => {
  const mockContent = {
    aboutMeText: {
      json: {
        content: [{ type: 'paragraph', children: [{ text: 'About me text' }] }]
      }
    },
    quickSkillsShowcase: { items: [{ _id: '1', _title: 'React' }] },
    experiences: { items: [] }
  };

  const mockSkills = { items: [{ _id: '1', _title: 'JavaScript' }] };

  it('renders about section with basic content', async () => {
    const component = await AboutSection({
      content: mockContent as Parameters<typeof AboutSection>[0]['content'],
      skills: mockSkills as Parameters<typeof AboutSection>[0]['skills']
    });

    const { container } = render(component);
    expect(container.querySelector('#about')).toBeInTheDocument();
  });
});
