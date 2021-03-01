const { generateConfig } = require('gatsby-plugin-ts-config');

module.exports = generateConfig({
  configDir: 'gatsby',
  projectRoot: __dirname,
});