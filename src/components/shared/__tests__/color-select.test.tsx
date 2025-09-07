import { fireEvent, render, screen } from '@testing-library/react';
import { ActiveColorThemeProvider } from '../../theme/active-theme';
import { ColorThemeSelect } from '../../theme/color-theme-select';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage
});

// Wrapper component with theme provider
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <ActiveColorThemeProvider>{children}</ActiveColorThemeProvider>;
}

describe('ColorSelect', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    document.documentElement.className = '';
    document.body.className = '';
  });

  it('renders color palette button', () => {
    render(
      <TestWrapper>
        <ColorThemeSelect />
      </TestWrapper>
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('opens popover when button is clicked', async () => {
    render(
      <TestWrapper>
        <ColorThemeSelect />
      </TestWrapper>
    );

    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Wait for popover to open
    await screen.findByText('Amber');
    expect(screen.getByText('Emerald')).toBeInTheDocument();
    expect(screen.getByText('Rose')).toBeInTheDocument();
    expect(screen.getByText('Indigo')).toBeInTheDocument();
  });

  it('updates theme when color is selected', async () => {
    render(
      <TestWrapper>
        <ColorThemeSelect />
      </TestWrapper>
    );

    // Open popover
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Wait for popover and click amber color
    const amberOption = await screen.findByText('Amber');
    fireEvent.click(amberOption);

    // Check that theme was applied to DOM
    expect(document.documentElement.classList.contains('theme-amber')).toBe(true);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'amber');
  });

  it('maps Emerald to green theme', async () => {
    render(
      <TestWrapper>
        <ColorThemeSelect />
      </TestWrapper>
    );

    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    const emeraldOption = await screen.findByText('Emerald');
    fireEvent.click(emeraldOption);

    expect(document.documentElement.classList.contains('theme-green')).toBe(true);
  });
});
