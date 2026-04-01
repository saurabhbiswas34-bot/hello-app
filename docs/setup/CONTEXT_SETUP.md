# React Project Context Setup

This file captures the full command flow and setup used in this project so you can recreate a similar starter quickly.

## 1) Create project

```bash
npm create vite@latest hello-app -- --template react
cd hello-app
npm install
```

## 2) Add app dependencies

```bash
npm install swr zustand
```

Used for:
- `zustand`: accordion state management
- `swr`: mock data fetching/caching flow

## 3) Add quality, security, and testing dependencies

```bash
npm install -D oxlint @axe-core/cli browser-driver-manager audit-ci eslint-plugin-security
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D @playwright/test start-server-and-test
npm install -D husky
```

Install Playwright browser:

```bash
npx playwright install chromium
```

Install synced Chrome + ChromeDriver for axe:

```bash
npx browser-driver-manager install chrome@146
```

## 4) Suggested project structure (Atomic Design + test setup)

Create these folders/files:

```text
src/
  components/
    atoms/
    molecules/
    organisms/
    templates/
  data/
  hooks/
  store/
  test/
tests/
  e2e/
scripts/
.husky/
```

## 5) Scripts to add in `package.json`

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

## 6) ESLint security plugin setup

In `eslint.config.js`, add:
- import: `eslint-plugin-security`
- extend: `pluginSecurity.configs.recommended`
- vitest globals for `src/**/*.test.{js,jsx}`

## 7) Vitest setup

In `vite.config.js`:
- `test.environment = "jsdom"`
- `test.setupFiles = "./src/test/setupTests.js"`
- `test.globals = true`
- `test.include = ["src/**/*.test.{js,jsx}"]`

In `src/test/setupTests.js`:

```js
import '@testing-library/jest-dom'
```

## 8) Playwright setup

Create `playwright.config.js` with:
- `testDir: "./tests/e2e"`
- `baseURL: "http://localhost:5173"`
- `webServer.command: "npm run dev -- --host localhost --port 5173"`
- `webServer.reuseExistingServer: true`

## 9) Axe helper script

Create `scripts/run-axe-check.mjs` to:
- detect installed browser-driver-manager Chrome/Driver paths
- run:

```bash
npx axe http://localhost:5173 --chrome-path "<...>" --chromedriver-path "<...>"
```

## 10) Husky pre-commit hook

Create `.husky/pre-commit`:

```sh
#!/usr/bin/env sh
npm run precommit:verify
```

Then initialize hooks:

```bash
npm run prepare
```

If repo is new:

```bash
git init
npm run prepare
```

## 11) Commands to verify all

```bash
npm run test:unit
npm run test:e2e
npm run check:all
npm run precommit:verify
```

## 12) What this setup gives you

- Atomic Design-based component organization
- Global state with Zustand
- Data fetching with SWR (mock-ready, API-ready)
- Code lint + security lint + dependency vulnerability audit
- Accessibility scan with axe-core CLI
- Unit tests with Vitest + Testing Library
- E2E tests with Playwright
- Pre-commit gate that runs all checks and tests
