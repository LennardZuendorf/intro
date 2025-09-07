import { render, screen, act } from '@testing-library/react';
import { ActiveColorThemeProvider, useThemeConfig } from '../active-theme';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Test component that uses the theme context
function TestComponent() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  
  return (
    <div>
      <span data-testid="current-theme">{activeTheme}</span>
      <button 
        data-testid="set-amber" 
        onClick={() => setActiveTheme('amber')}
      >
        Set Amber
      </button>
      <button 
        data-testid="set-default" 
        onClick={() => setActiveTheme('default')}
      >
        Set Default
      </button>
    </div>
  );
}

describe('ActiveThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear any existing theme classes
    document.documentElement.className = '';
    document.body.className = '';
  });

  it('initializes with default theme when no localStorage value', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ActiveColorThemeProvider>
        <TestComponent />
      </ActiveColorThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('default');
  });

  it('loads saved theme from localStorage on mount', () => {
    mockLocalStorage.getItem.mockReturnValue('amber');
    
    render(
      <ActiveColorThemeProvider>
        <TestComponent />
      </ActiveColorThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('amber');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('theme');
  });

  it('ignores invalid theme values from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-theme');
    
    render(
      <ActiveColorThemeProvider>
        <TestComponent />
      </ActiveColorThemeProvider>
    );
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('default');
  });

  it('updates theme and persists to localStorage', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ActiveColorThemeProvider>
        <TestComponent />
      </ActiveColorThemeProvider>
    );
    
    const setAmberButton = screen.getByTestId('set-amber');
    
    await act(async () => {
      setAmberButton.click();
    });
    
    expect(screen.getByTestId('current-theme')).toHaveTextContent('amber');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('theme', 'amber');
  });

  it('applies theme classes to DOM elements', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <ActiveColorThemeProvider>
        <TestComponent />
      </ActiveColorThemeProvider>
    );
    
    const setAmberButton = screen.getByTestId('set-amber');
    
    await act(async () => {
      setAmberButton.click();
    });
    
    expect(document.documentElement.classList.contains('theme-amber')).toBe(true);
    expect(document.body.classList.contains('theme-container')).toBe(true);
  });

  it('removes old theme classes when switching themes', async () => {
    mockLocalStorage.getItem.mockReturnValue('amber');
    
    render(
      <ActiveColorThemeProvider>
        <TestComponent />
      </ActiveColorThemeProvider>
    );
    
    // Should start with amber theme
    expect(document.documentElement.classList.contains('theme-amber')).toBe(true);
    
    const setDefaultButton = screen.getByTestId('set-default');
    
    await act(async () => {
      setDefaultButton.click();
    });
    
    expect(document.documentElement.classList.contains('theme-amber')).toBe(false);
    expect(document.documentElement.classList.contains('theme-default')).toBe(true);
  });

  it('throws error when useThemeConfig is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useThemeConfig must be used within an ActiveThemeProvider');
    
    consoleSpy.mockRestore();
  });
});

