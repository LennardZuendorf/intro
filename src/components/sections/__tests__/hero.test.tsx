import { render } from '@testing-library/react';
import { HeroSection } from '../hero';

// Mock title-case package
jest.mock('title-case', () => ({
  titleCase: (str: string) => str
}));

// Mock basehub components
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
    return (
      <div {...props} data-testid='next-image' role='img' aria-label={props.alt || 'Mock image'} />
    );
  };
});

// Mock SocialButtons
jest.mock('@/components/shared/social-buttons', () => ({
  SocialButtons: () => <div data-testid='social-buttons'>Social Buttons</div>
}));

describe('HeroSection', () => {
  const mockContent = {
    mainHeroText: {
      json: {
        content: [{ type: 'paragraph', children: [{ text: 'Welcome to my portfolio' }] }]
      }
    },
    selectedProject: {
      _title: 'Test Project',
      _slug: 'test-project',
      shortDescription: 'A test project description'
    },
    selectedExperience: {
      _title: 'Test Company',
      companyDescription: 'A test company',
      companyLink: 'https://test.com'
    }
  };

  it('renders hero section with basic content', async () => {
    const component = await HeroSection({
      content: mockContent as Parameters<typeof HeroSection>[0]['content'],
      showAbout: true,
      showProjects: true
    });

    const { container } = render(component);
    expect(container.querySelector('#hero')).toBeInTheDocument();
  });
});
