# React Project Context Setup

## Overview

This is the **long-form setup narrative** for recreating this project's toolchain: Vite React, Atomic Design layout, Zustand + SWR, oxlint/ESLint/security audit, axe, Vitest, Playwright, Husky hooks, and GitHub Actions CI/CD + Pages deploy. It mirrors what the [react-quality-starter](../../.cursor/skills/react-quality-starter/SKILL.md) skill automates.

**Shorter command-only list:** [BOOTSTRAP_COMMANDS.md](BOOTSTRAP_COMMANDS.md). **Copy-paste configs (single source for agents):** [.cursor/skills/react-quality-starter/reference.md](../../.cursor/skills/react-quality-starter/reference.md).
Implementation conventions:

- [../conventions/COMPONENT_GUIDE.md](../conventions/COMPONENT_GUIDE.md)
- [../conventions/FEATURE_GUIDE.md](../conventions/FEATURE_GUIDE.md)

## When to Use This Doc

- Onboarding: understand _why_ each step exists and in what order.
- Debugging a broken local setup (compare your tree and scripts to the numbered sections).
- Extending the stack (add a step explicitly; do not orphan new tools from `precommit:verify` or CI).

## When NOT to Use This Doc Alone

- **macOS/Linux axe paths** - `reference.md`'s `run-axe-check.mjs` may use Windows paths; adjust for your OS and document the change.
- **Policy** (audit severity, CI matrix) - team decides; this doc describes the current hello-app defaults.

## 1) Create project

```bash
npm create vite@latest hello-app -- --template react
cd hello-app
npm install
```

Use another directory name if you prefer; keep commands consistent afterward.

## 2) Add app dependencies

```bash
npm install swr zustand react-router-dom
```

- **Zustand:** global UI state (e.g. accordion `openItemId`).
- **SWR:** data fetching and cache for template-level loading/error/success.
- **React Router DOM:** route-level feature navigation (`BrowserRouter`, `Routes`, `Route`, `NavLink`).

## 3) Add quality, security, and testing dependencies

```bash
npm install -D oxlint @axe-core/cli browser-driver-manager audit-ci eslint-plugin-security
npm install -D eslint-plugin-jsx-a11y knip size-limit @size-limit/preset-app
npm install -D prettier lint-staged lighthouse
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D @playwright/test start-server-and-test husky
npm install -D typescript typescript-eslint @vitest/coverage-v8 @vitest/ui
```

**Playwright browser:**

```bash
npx playwright install chromium
```

**Synced Chrome + ChromeDriver for axe CLI:**

```bash
npx browser-driver-manager install chrome@146
```

Adjust Chrome major if your team standardizes a different version; then align any path logic in `scripts/run-axe-check.mjs`.

## 4) Suggested project structure (current pattern)

```text
src/
  app/
    App.tsx
    AppShell.tsx
  components/
    atoms/
    molecules/
    organisms/
  config/
    api.ts
  features/
    home/
    users/
      hooks/
      types/
    products/
      hooks/
      types/
  types/
    accordion.ts
  test/
tests/
  e2e/
scripts/
.husky/
```

## 5) Scripts to add in `package.json`

See the scripts block in [reference.md](../../.cursor/skills/react-quality-starter/reference.md). Critical names: `check:oxlint`, `check:axe`, `check:vuln`, `check:security`, `check:all`, `test:unit`, `test:e2e`, `test:all`, `precommit:verify`, `prepare`.

## 6) ESLint security plugin

In `eslint.config.js`: import `eslint-plugin-security`, extend recommended, add Vitest globals for `src/**/*.test.{ts,tsx}`. Full file: [reference.md](../../.cursor/skills/react-quality-starter/reference.md).

## 7) Vitest setup

In `vite.config.ts`: `test.environment`, `setupFiles`, `globals`, `include`. In `src/test/setupTests.ts`: `@testing-library/jest-dom`. Full snippets: [reference.md](../../.cursor/skills/react-quality-starter/reference.md).

## 8) Playwright setup

`playwright.config.ts`: `testDir`, `baseURL`, `webServer` on port `5173`, `reuseExistingServer`. Full file: [reference.md](../../.cursor/skills/react-quality-starter/reference.md).

## 9) Axe helper script

`scripts/run-axe-check.mjs` resolves browser-driver-manager Chrome/ChromeDriver and runs axe against `http://localhost:5173`. Full script: [reference.md](../../.cursor/skills/react-quality-starter/reference.md).

## 10) CI/CD and GitHub Pages

This repo's workflow is `.github/workflows/ci-cd.yml`:

- `quality` job runs `npm run check:all`, `npm run test:all`, then DAST (`check:dast:zap`, `check:dast:lighthouse`).
- `DAST_TARGET_URL` is set only for ZAP (`http://host.docker.internal:5173`).
- Artifacts are uploaded from `reports/` and `dist/`.
- `deploy-pages` runs only after quality passes on push to `main` or `master`.
- Pages build uses `VITE_BASE_PATH=/${{ github.event.repository.name }}/`.

## 11) Husky pre-commit

`.husky/pre-commit`:

```sh
#!/usr/bin/env sh
npm run precommit:verify
```

Then:

```bash
npm run prepare
```

New repo:

```bash
git init
npm run prepare
```

## 12) Route and feature conventions (important)

- Use `react-router-dom` routes from `src/app/App.tsx`.
- Prefer route-level lazy loading for feature pages:
  - `const Home = lazy(() => import('../features/home/Home'))`
  - Wrap route elements with `Suspense`.
- Keep feature-owned types inside each feature (`features/<name>/types/*`).
- Keep API URLs centralized in `src/config/api.ts` and driven by `VITE_API_BASE_URL`.
- Keep component/feature CSS co-located (`Component.tsx` + `Component.css`).
- BEM is mandatory for all component/feature CSS (`block__element--modifier`).
- TypeScript is mandatory for app code (`.tsx` / `.ts`); do not add `.jsx` / `.js` files.
- Keep `src/index.css` for global foundation only (tokens/base/root).

## 13) Commands to verify all

```bash
npm run test:unit
npm run test:e2e
npm run check:all
npm run check:ci
npm run precommit:verify
```

## 14) What this setup gives you

- Atomic Design-oriented components
- Zustand + SWR with a clear template/hook boundary
- Lint + security lint + vulnerability audit
- Accessibility scan via axe
- Unit + E2E tests
- Pre-commit parity with full verification
- Route-level chunk splitting ready architecture

## Common Rationalizations

| Rationalization                                         | Reality                                                                           |
| ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| I'll skip browser-driver-manager and use system Chrome. | Then `run-axe-check.mjs` must be updated; do not leave a half-migrated script.    |
| I'll paste scripts from an old gist.                    | Drift breaks pre-commit; use `reference.md` as canonical.                         |
| Husky optional for solo dev.                            | You lose the main enforcement story; at least run `precommit:verify` before push. |
| I'll use a different port everywhere.                   | Update Playwright, `check:axe`, and dev commands together.                        |

## Red Flags

- `prepare` / Husky not run after clone -> hooks never fire.
- Playwright `baseURL` and dev server URL **out of sync**.
- Axe script points to **wrong OS** binary paths.
- `precommit:verify` missing from hook while developers think they are protected.

## Verification

Setup is complete when:

- [ ] `npm run check:all` passes.
- [ ] `npm run test:all` passes.
- [ ] `npm run precommit:verify` passes.
- [ ] `.husky/pre-commit` exists and runs `npm run precommit:verify`.
- [ ] `reference.md` snippets match this repo's actual config files (or differences are documented in the repo).
