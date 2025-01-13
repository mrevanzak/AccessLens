import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  // translate an entire config
  ...compat.config({
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
    extends: [
      'eslint:recommended',
      'next',
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:storybook/recommended',
    ],
    globals: {
      React: true,
      JSX: true,
    },
  }),
];

export default eslintConfig;
