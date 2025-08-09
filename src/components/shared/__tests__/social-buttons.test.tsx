import { render, screen } from '@testing-library/react';
import { SocialButtons } from '../social-buttons';

// Mock basehub
jest.mock('basehub', () => ({
  basehub: () => ({
    query: () =>
      Promise.resolve({
        globals: {
          socials: {
            items: [
              { _id: '1', _title: 'GitHub', url: 'https://github.com', icon: '<svg>Icon</svg>' }
            ]
          }
        }
      })
  })
}));

// Mock basehub Icon component
jest.mock('basehub/react-icon', () => ({
  Icon: ({ content }: { content: string }) => <span data-testid='icon'>{content}</span>
}));

describe('SocialButtons', () => {
  it('renders social buttons when socials are available', async () => {
    const component = await SocialButtons({});

    const { container } = render(component);
    expect(container.firstChild).toBeInTheDocument();
  });
});
