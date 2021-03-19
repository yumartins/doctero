module.exports = {
  bail: true,
  preset: 'ts-jest',
  projects: [
    '<rootDir>/apps/server/jest.config.js',
  ],
  testMatch: ['*.spec.ts', '*.spec.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  clearMocks: true,
  testEnvironment: 'node',
}
