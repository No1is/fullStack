import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin-js'


export default defineConfig([
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 'latest',
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  },
  tseslint.configs.recommended,
  js.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylistic
    },
    rules: {
      '@stylistic/js/indent': ['error',2],
      '@stylistic/js/linebreak-style': ['error','unix'],
      '@stylistic/js/quotes': ['error','single'],
      '@stylistic/js/semi': ['error','never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error','always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
])
