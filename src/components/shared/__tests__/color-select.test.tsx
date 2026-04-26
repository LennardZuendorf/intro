import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeSelect } from '../../theme/theme-select';

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute='class' defaultTheme='system'>
      {children}
    </NextThemeProvider>
  );
}

beforeAll(() => {
  // Radix DropdownMenu uses pointer-capture APIs that JSDOM does not implement.
  // Stub them so the menu can open in tests.
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false;
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {};
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {};
  }
});

describe('ThemeSelect', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    document.body.className = '';

    window.matchMedia =
      window.matchMedia ||
      ((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false
      }));
  });

  it('renders theme select button', () => {
    render(
      <TestWrapper>
        <ThemeSelect />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /select theme/i })).toBeInTheDocument();
  });

  it('opens menu and shows theme options when trigger receives keyboard activation', async () => {
    render(
      <TestWrapper>
        <ThemeSelect />
      </TestWrapper>
    );

    const button = screen.getByRole('button', { name: /select theme/i });
    button.focus();
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    await screen.findByText('System');
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
  });
});
