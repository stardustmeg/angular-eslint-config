import { FlatCompat } from '@eslint/eslintrc';
import angular from 'angular-eslint';
import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';
import path from 'path';
import tsEslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

const customRules = {
  '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
  '@typescript-eslint/explicit-function-return-type': 'error',
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      accessibility: 'explicit',
      overrides: {
        constructors: 'off',
      },
    },
  ],
  '@typescript-eslint/explicit-module-boundary-types': 'error',
  '@typescript-eslint/method-signature-style': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-inferrable-types': 'error',
  '@typescript-eslint/no-use-before-define': 'error',
  '@typescript-eslint/prefer-for-of': 'off',
  '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
  'class-methods-use-this': 'off',
  curly: ['error', 'all'],
  'dot-notation': 'off',
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    },
  ],
  'import/prefer-default-export': 'off',
  'lines-between-class-members': [
    'error',
    {
      enforce: [
        { blankLine: 'always', next: 'method', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'method' },
      ],
    },
  ],
  'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
  'no-empty-function': 'error',
  'no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
};

export default [
  { ignores: ['eslint.config.js', '.validate-branch-name.cjs'] },
  ...compat.extends('airbnb-base'),
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,
  ...tsEslint.configs.stylistic,
  perfectionist.configs['recommended-natural'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        es6: true,
      },
      parserOptions: {
        project: true,
        projectService: {
          defaultProject: './tsconfig.json',
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      ...customRules,
    },
    settings: {
      'import/resolver': {
        alias: {
          extensions: ['.ts', '.js', '.jsx', '.json'],
          map: [['@', './src']],
        },
      },
    },
  },

  // Angular configuration
  {
    name: 'angular',
    extends: [...angular.configs.tsRecommended],
    files: ['*.ts'],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'app',
          style: 'kebab-case',
          type: 'element',
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'app',
          style: 'camelCase',
          type: 'attribute',
        },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
    },
  },

  // HTML files configuration
  {
    name: 'html',
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    files: ['*.html'],
  },

  // TypeScript test files configuration
  {
    name: 'test files',
    files: ['*.spec.ts'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'max-lines-per-function': 'off',
    },
  },
];
