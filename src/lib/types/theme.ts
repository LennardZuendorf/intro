export type AppTheme = 'default' | 'mono' | 'blue' | 'green' | 'amber' | 'rose' | 'purple' | 'teal';

export type ThemeOption = {
  name: string;
  value: AppTheme;
};

export const DEFAULT_THEMES: ThemeOption[] = [
  {
    name: 'Default',
    value: 'default'
  },
  {
    name: 'Mono',
    value: 'mono'
  }
];

export const COLOR_THEMES: ThemeOption[] = [
  {
    name: 'Blue',
    value: 'blue'
  },
  {
    name: 'Green',
    value: 'green'
  },
  {
    name: 'Amber',
    value: 'amber'
  },
  {
    name: 'Rose',
    value: 'rose'
  },
  {
    name: 'Purple',
    value: 'purple'
  },
  {
    name: 'Teal',
    value: 'teal'
  }
];
