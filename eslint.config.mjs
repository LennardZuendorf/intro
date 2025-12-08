import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      // Custom rule overrides can be added here
      // Example: 'react/no-unescaped-entities': 'off',
    }
  },
  // Override default ignores of eslint-config-next
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'node_modules/**',
    '.contentlayer/**',
    'public/**',
    '.fleet/**',
    '.idea/**',
    '.husky/**',
    '.history/**',
    'dist/**',
    'coverage/**'
  ])
]);

export default eslintConfig;
