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
  },
  {
    ignores: ['babel.config.js', 'eslint.config.js', '*.config.js'],
  },
];
