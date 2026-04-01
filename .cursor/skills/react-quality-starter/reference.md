# Reference

Copy-paste templates for this starter setup.

## `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{js,jsx}'],
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.js',
    globals: true,
  },
})
```

## `eslint.config.js`

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import pluginSecurity from 'eslint-plugin-security'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      pluginSecurity.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['src/**/*.test.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },
])
```

## `playwright.config.js`

```js
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  webServer: {
    command: 'npm run dev -- --host localhost --port 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120000,
  },
})
```

## `src/test/setupTests.js`

```js
import '@testing-library/jest-dom'
```

## `scripts/run-axe-check.mjs`

```js
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const home = process.env.USERPROFILE || process.env.HOME
const chromeRoot = join(home, '.browser-driver-manager', 'chrome')
const driverRoot = join(home, '.browser-driver-manager', 'chromedriver')

const getLatestVersionDir = (rootPath) => {
  if (!existsSync(rootPath)) return null
  const versions = readdirSync(rootPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  return versions.at(-1) || null
}

const chromeDirName = getLatestVersionDir(chromeRoot)

if (!chromeDirName) {
  console.error(
    'No browser-driver-manager Chrome install found. Run: npx browser-driver-manager install chrome',
  )
  process.exit(1)
}

const chromePath = join(chromeRoot, chromeDirName, 'chrome-win64', 'chrome.exe')
const chromedriverPath = join(
  driverRoot,
  chromeDirName,
  'chromedriver-win64',
  'chromedriver.exe',
)

if (!existsSync(chromePath) || !existsSync(chromedriverPath)) {
  console.error('Chrome or ChromeDriver binary not found for install:', chromeDirName)
  process.exit(1)
}

const result = spawnSync(
  'npx',
  [
    'axe',
    'http://localhost:5173',
    '--chrome-path',
    chromePath,
    '--chromedriver-path',
    chromedriverPath,
  ],
  { stdio: 'inherit', shell: true },
)

process.exit(result.status ?? 1)
```

## `package.json` scripts block

```json
{
  "scripts": {
    "dev": "vite",
    "dev:reset": "npx kill-port 5173 && vite --host localhost --port 5173 --open",
    "build": "vite build",
    "lint": "eslint .",
    "prepare": "husky",
    "preview": "vite preview",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "test:all": "npm run test:unit && npm run test:e2e",
    "check:oxlint": "oxlint .",
    "check:axe": "start-server-and-test \"npm run dev -- --host localhost --port 5173\" http://localhost:5173 \"node scripts/run-axe-check.mjs\"",
    "check:vuln": "audit-ci --moderate",
    "check:security": "npm run lint && npm run check:vuln",
    "check:all": "npm run check:oxlint && npm run check:axe && npm run check:security",
    "precommit:verify": "npm run check:all && npm run test:all"
  }
}
```

## `.husky/pre-commit`

```sh
#!/usr/bin/env sh
npm run precommit:verify
```
