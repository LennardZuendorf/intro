import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.history/'],
  modulePathIgnorePatterns: ['/.history/'],
  watchPathIgnorePatterns: ['/.history/'],
  // Allow transforming specific ESM dependencies used by components under test
  transformIgnorePatterns: [
    'node_modules/(?!(title-case)/)'
  ],
  // Exclude UI framework components from coverage
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.history/',
    'src/components/ui/',
    'src/lib/utils/ui.ts'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/components/ui/**',
    '!src/lib/utils/ui.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)