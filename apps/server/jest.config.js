const { join } = require('path');

const package = require('./package.json');
const baseConfig = require('../../jest.config');

delete baseConfig.projects

module.exports = {
  ...baseConfig,
  displayName: package.name,
  testMatch: [join(__dirname, 'tests/*.spec.{ts,tsx}')],
}
