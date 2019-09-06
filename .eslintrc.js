module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    // Base.
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 'warn',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'spaced-comment': 'off',

    // Import.
    'import/prefer-default-export': 'off',

    // TypeScript.
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'off',

    // React/JSX
    // 'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
  }
}
