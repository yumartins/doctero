module.exports = () => ({
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
    '@babel/typescript',
    ['minify', { builtIns: false }],
  ],
  plugins: [
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining',
  ],
});
