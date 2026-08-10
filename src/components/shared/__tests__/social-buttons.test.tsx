import { render } from '@testing-library/react';
import { type SocialItem, SocialButtons } from '../social-buttons';

const fixtureSocials: SocialItem[] = [
  { _id: '1', _title: 'GitHub', url: 'https://github.com', icon: '<svg>Icon</svg>' }
];

describe('SocialButtons', () => {
  it('renders social buttons when socials are available', () => {
    const { container } = render(<SocialButtons socials={fixtureSocials} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders nothing when socials array is empty', () => {
    const { container } = render(<SocialButtons socials={[]} />);
    expect(container.firstChild).toBeNull();
  });
});
