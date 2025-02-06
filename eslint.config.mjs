import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    rules: {
      'import/no-unresolved': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: ['../*', './*'],
        },
      ],
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index', 'object'],
          pathGroups: [
            {
              pattern: '~/**',
              group: 'external',
              position: 'before',
            },
            { pattern: '@*', group: 'external', position: 'after' },
            { pattern: '@*/**', group: 'external', position: 'after' },
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];
