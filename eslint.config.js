import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores([
    'dist',
    'build',
    'node_modules',
    'react-router',
    'coverage',
    'public',
    'out',
    'lib',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Cho phép dùng kiểu {}
      '@typescript-eslint/no-empty-object-type': 'off',
      // Cho phép dùng namespace (hoặc có thể migrate sang module sau)
      '@typescript-eslint/no-namespace': 'off',
      // Tắt bắt buộc chỉ export component trong file
      'react-refresh/only-export-components': 'off',
      // Cho phép destructuring object rỗng ({} = ...)
      'no-empty-pattern': 'off',
    },
  },
])
