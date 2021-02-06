module.exports = () => ({
  presets: [
    '@babel/env',
    '@babel/typescript',
    ['minify', {
      builtIns: false,
    }],
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
  ],
});
