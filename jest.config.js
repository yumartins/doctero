module.exports = {
  bail: true,
  clearMocks: true,
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'apps/**/src/**/*.{js,ts,tsx}',
  //   'apps/**/src/*.{js,ts,tsx}',
  //   '!**/*-test.{js,ts,tsx}',
  // ],
  // coverageReporters: ['json', 'lcov'],
  projects: ['<rootDir>/apps/server/jest.config.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
}
