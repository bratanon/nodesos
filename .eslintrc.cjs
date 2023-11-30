/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  root: true,
  overrides: [
    {
      files: ['**.test.ts'],
      plugins: ['jest'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
      ],
    }
  ],
  env: {
    'jest/globals': true
  },
  settings: {
    jest: {
      version: 29
    },
  },
  rules: {
    'no-console': 'warn',
    'jest/no-disabled-tests': 'error',
    'jest/no-duplicate-hooks': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-contain': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/valid-expect': 'error',
    'simple-import-sort/imports': ['error', {
      'groups': [['^\\u0000', '^node:', '^@?\\w', '^', '^\\.']]
    }],
  }
};
