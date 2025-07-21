module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  rules: {
    // 自定义规则
    'no-console': 'warn',
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['next/core-web-vitals', '@typescript-eslint/recommended', 'prettier'],
    },
  ],
}
