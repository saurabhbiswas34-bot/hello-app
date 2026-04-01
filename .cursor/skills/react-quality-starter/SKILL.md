---
name: react-quality-starter
description: Creates a Vite React starter with Atomic Design folders, Zustand state, SWR data hook, security checks, accessibility check (axe), unit tests (Vitest), E2E tests (Playwright), and Husky pre-commit pipeline. Use when user asks to bootstrap a React project with production-ready quality gates.
---

# React Quality Starter

## Purpose

Set up a reusable React starter with:
- Atomic Design structure
- Zustand + SWR
- lint + oxlint + security + vulnerability checks
- axe accessibility check
- unit + E2E tests
- pre-commit verification hook

## Workflow

1. Create project
```bash
npm create vite@latest <app-name> -- --template react
cd <app-name>
npm install
```

2. Install runtime deps
```bash
npm install swr zustand
```

3. Install dev tooling
```bash
npm install -D oxlint @axe-core/cli browser-driver-manager audit-ci eslint-plugin-security
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D @playwright/test start-server-and-test husky
npx playwright install chromium
npx browser-driver-manager install chrome@146
```

4. Create folder layout
```text
src/components/atoms
src/components/molecules
src/components/organisms
src/components/templates
src/data
src/hooks
src/store
src/test
tests/e2e
scripts
.husky
```

5. Configure scripts in `package.json`
- `test:unit`: `vitest run`
- `test:e2e`: `playwright test`
- `test:all`: `npm run test:unit && npm run test:e2e`
- `check:oxlint`: `oxlint .`
- `check:axe`: `start-server-and-test "npm run dev -- --host localhost --port 5173" http://localhost:5173 "node scripts/run-axe-check.mjs"`
- `check:vuln`: `audit-ci --moderate`
- `check:security`: `npm run lint && npm run check:vuln`
- `check:all`: `npm run check:oxlint && npm run check:axe && npm run check:security`
- `precommit:verify`: `npm run check:all && npm run test:all`
- `prepare`: `husky`

6. Configure lint/test
- Add `eslint-plugin-security` recommended config in `eslint.config.js`
- Add Vitest globals for `src/**/*.test.{js,jsx}`
- Set Vite test config:
  - `environment: "jsdom"`
  - `setupFiles: "./src/test/setupTests.js"`
  - `globals: true`
  - `include: ["src/**/*.test.{js,jsx}"]`

7. Configure Playwright
- Create `playwright.config.js` with:
  - `testDir: "./tests/e2e"`
  - `use.baseURL: "http://localhost:5173"`
  - `webServer.command: "npm run dev -- --host localhost --port 5173"`
  - `webServer.reuseExistingServer: true`

8. Create accessibility helper
- Create `scripts/run-axe-check.mjs` to discover browser-driver-manager Chrome/Driver paths and run axe against `http://localhost:5173`.

9. Configure pre-commit hook
Create `.husky/pre-commit`:
```sh
#!/usr/bin/env sh
npm run precommit:verify
```

Then run:
```bash
git init
npm run prepare
```

## Final verification

Run:
```bash
npm run check:all
npm run test:all
npm run precommit:verify
```

## Output rules

- Keep code ASCII unless file already uses Unicode.
- Prefer small, composable components.
- Ensure all commands succeed before finishing.
- If any check fails, fix and rerun until green.

## Additional resources

- For example prompts and expected outcomes, see [examples.md](examples.md).
- For copy-paste configs and scripts, see [reference.md](reference.md).
