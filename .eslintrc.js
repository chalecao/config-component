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
    'no-new': 'off',
    'no-console': 'off',
    'no-prototype-builtins': 0,
    'consistent-return': 0,

    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'spaced-comment': 'off',

    // Import.
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',

    // TypeScript.
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,

    // React/JSX
    // 'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/destructuring-assignment': 0,
    'react/no-array-index-key': 0

  }
}
