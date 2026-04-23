# Reference

Copy-paste templates for this starter setup.

## Dependencies

Runtime:

```bash
npm install swr react-router-dom
```

Dev (tooling + gates):

```bash
npm install -D oxlint @axe-core/cli browser-driver-manager audit-ci eslint-plugin-security eslint-plugin-jsx-a11y
npm install -D knip size-limit @size-limit/preset-app
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D @playwright/test start-server-and-test husky
npm install -D prettier lint-staged lighthouse
npm install -D typescript typescript-eslint @vitest/coverage-v8 @vitest/ui
```

One-time binaries:

```bash
npx playwright install chromium
npx browser-driver-manager install chrome@146
```

## `vite.config.ts`

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
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
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      pluginSecurity.configs.recommended,
      jsxA11y.flatConfigs.recommended,
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
    files: ['src/**/*.test.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.vitest,
      },
    },
  },
])
```

## `playwright.config.ts`

```ts
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

## `src/test/setupTests.ts`

```ts
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
    'No browser-driver-manager Chrome install found. Run: npx browser-driver-manager install chrome'
  )
  process.exit(1)
}

const chromePath = join(chromeRoot, chromeDirName, 'chrome-win64', 'chrome.exe')
const chromedriverPath = join(
  driverRoot,
  chromeDirName,
  'chromedriver-win64',
  'chromedriver.exe'
)

if (!existsSync(chromePath) || !existsSync(chromedriverPath)) {
  console.error(
    'Chrome or ChromeDriver binary not found for install:',
    chromeDirName
  )
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
  { stdio: 'inherit', shell: true }
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
    "format": "prettier --check .",
    "format:fix": "prettier --write .",
    "test:unit": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:all": "npm run test:unit && npm run test:e2e",
    "check:oxlint": "oxlint . > reports/lint/oxlint.txt",
    "lint:report:json": "eslint . -f json -o reports/lint/eslint.json",
    "lint:report:html": "eslint . -f html -o reports/lint/eslint.html",
    "check:axe": "start-server-and-test \"npm run dev -- --host localhost --port 5173\" http://localhost:5173 \"node scripts/run-axe-check.mjs && node scripts/render-axe-report.mjs\"",
    "check:vuln": "audit-ci --moderate --output-format json --report-type full > reports/deps/audit-ci.json",
    "check:security": "npm run lint && npm run check:vuln",
    "check:deadcode": "knip --production --reporter json > reports/lint/knip.json",
    "check:sast": "npm run lint:report:json && node scripts/generate-sast-report.mjs",
    "check:dast:zap": "start-server-and-test \"npm run dev -- --host 0.0.0.0 --port 5173\" http://localhost:5173 \"node scripts/run-zap-baseline.mjs\"",
    "check:dast:lighthouse": "start-server-and-test \"npm run dev -- --host localhost --port 5173\" http://localhost:5173 \"node scripts/run-lighthouse.mjs\"",
    "check:dast": "npm run check:dast:zap && npm run check:dast:lighthouse",
    "check:size": "npm run build && size-limit --json > reports/size/size-limit.json",
    "check:types": "tsc --noEmit",
    "check:all": "npm run check:types && npm run format && npm run lint && npm run lint:report:json && npm run lint:report:html && npm run check:oxlint && npm run check:deadcode && npm run check:sast && npm run check:axe && npm run check:security && npm run check:size",
    "check:ci": "npm run check:all && npm run test:all && npm run check:dast",
    "precommit:verify": "npm run check:staged",
    "prepush:verify": "npm run check:all && npm run test:all"
  },
  "size-limit": [
    {
      "name": "app bundle",
      "path": "dist/assets/*.js",
      "limit": "250 KB"
    }
  ]
}
```

## `knip.json`

```json
{
  "$schema": "https://unpkg.com/knip@latest/schema.json",
  "entry": ["src/app/main.tsx", "src/app/App.tsx"],
  "project": ["src/**/*.{ts,tsx}"],
  "ignore": ["dist/**", "test-results/**"],
  "ignoreDependencies": ["@size-limit/preset-app"]
}
```

## Feature conventions

Use this default for new feature work:

```text
src/features/<feature>/
  <Feature>.tsx
  <Feature>.css
  hooks/
  types/
```

- Feature-only types stay in `features/<feature>/types`.
- Shared cross-feature types stay in `src/types`.
- API endpoints are centralized in `src/config/api.ts` with env fallback (`VITE_API_BASE_URL`).
- BEM is mandatory for feature CSS (`block__element--modifier`).
- TypeScript is mandatory for feature code (`.tsx` for components/pages, `.ts` for modules).

## Component conventions (Atomic Design)

```text
src/components/
  atoms/
    <Name>.tsx
    <Name>.css
    <Name>.test.tsx
  molecules/
    <Name>.tsx
    <Name>.css
    <Name>.test.tsx
  organisms/
    <Name>/
      <Name>.tsx
      <Name>.css
      <Name>.test.tsx
```

Rules:

- Do not put feature page wiring or fetch logic in atoms.
- Keep component APIs typed and stable.
- If component props change, update all callers and tests in the same change.
- BEM is mandatory for component CSS (`block__element--modifier`).
- TypeScript is mandatory for component code (`.tsx`/`.ts`), no new `.jsx`/`.js`.
- When shared component state is needed, use reducer/context split files:
  - `<ComponentName>Provider.tsx` (provider + `useReducer`)
  - `use<ComponentName>Store.ts` (safe context hook)
  - `<componentName>Reducer.ts` (reducer + actions + initial state)
  - `<componentName>Context.ts` (context object + value type)

## Removal checklists

### Component removal checklist

- Remove component file(s), CSS, and tests.
- Remove all imports/usages in callers.
- Remove barrel exports/index exports if present.
- Run `tsc`, `eslint`, and impacted tests.
- Update docs/examples if the component was part of documented patterns.

### Feature removal checklist

- Remove route entry from `src/app/App.tsx`.
- Remove nav links or UI entry points (for example `Navbar` items).
- Remove feature folder and feature tests.
- Remove now-unused shared code only after verifying no references remain.
- Update architecture/testing docs to reflect current route set.

> **Note on `check:size`:** the 250 KB budget is a starter value; bump it consciously when a heavy dep is justified and state the new number in the PR description.
>
> **Note on `check:deadcode`:** `knip` flags unused files/exports. If a file is intentionally kept (e.g. an older feature behind navigation), list its entry in `knip.json` - do not suppress the warning blindly.

## `.husky/pre-commit`

```sh
#!/usr/bin/env sh
npm run precommit:verify
```

## `.github/workflows/ci-cd.yml` (key points)

```yaml
on:
  pull_request:
  push:
    branches: [main, master]

jobs:
  quality:
    # run check:all + test:all + DAST (ZAP then Lighthouse)
  deploy-pages:
    # only on push to main/master, gated by quality
    # build with VITE_BASE_PATH=/${{ github.event.repository.name }}/
```
