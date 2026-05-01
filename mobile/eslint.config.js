import callstackConfig from '@callstack/eslint-config/react-native.flat.js';
import tsEslintParser from '@typescript-eslint/parser';

export default [
  ...callstackConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: { project: './tsconfig.json' },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed in React 19
    },
  },
  {
    ignores: ['babel.config.js', 'eslint.config.js', '*.config.js'],
  },
];
