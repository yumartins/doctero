module.exports = {
  preset: 'ts-jest',
  projects: [
    '<rootDir>/apps/server/jest.config.js',
  ],
  testMatch: ['*.spec.ts', '*.spec.tsx'],
  clearMocks: true,
  testEnvironment: 'node',
}
