module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: { node: 'current' },
      }],
      '@babel/preset-typescript',
      ['minify', { builtIns: false }],
    ],
    plugins: [
      '@babel/proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
    ],
  };
};
