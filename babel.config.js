module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@': './src',
            '@core': './src/core',
            '@hooks': './src/hooks',
            '@utils': './src/utils',
            '@components': './src/components',
          },
        },
      ],
      'react-native-reanimated/plugin',   // MUST BE LAST
    ],
  };
};
