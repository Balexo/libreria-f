module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'expo',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react-native/no-inline-styles': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
