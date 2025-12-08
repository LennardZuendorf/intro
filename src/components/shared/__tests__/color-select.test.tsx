import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeSelect } from '../../theme/theme-select';

// Wrapper using the current next-themes-based ThemeSelect
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute='class' defaultTheme='system'>
      {children}
    </NextThemeProvider>
  );
}

describe('ThemeSelect', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    document.body.className = '';

    // next-themes relies on matchMedia; provide a basic mock for JSDOM
    // @ts-expect-error - adding to window for test environment
    window.matchMedia = window.matchMedia || ((query: string) => ({
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

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('opens popover when button is clicked', async () => {
    render(
      <TestWrapper>
        <ThemeSelect />
      </TestWrapper>
    );

    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Wait for popover to open and show theme options
    await screen.findByText('System');
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
  });
});
