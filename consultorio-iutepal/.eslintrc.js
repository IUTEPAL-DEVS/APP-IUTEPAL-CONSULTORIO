module.exports = {
  extends: ['next', 'prettier', 'react-app', 'plugin:tailwindcss/recommended'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'no-console': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'testing-library/prefer-screen-queries': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'tailwindcss/classnames-order': 'off',
    'import/order': 'off',
  },
};
