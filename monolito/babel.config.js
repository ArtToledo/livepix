module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@infra': './src/infra',
          '@schemas': './src/data/mongoose/schemas',
          '@entities': './src/domains/entities',
          '@domains': './src/domains',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
