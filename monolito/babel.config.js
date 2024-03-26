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
          '@models': './src/data/mongoose/models',
          '@data': './src/data',
          '@interfaces': './src/interfaces',
          '@adapters': './src/adapters',
          '@main': './src/main',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
