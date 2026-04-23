# Bootstrap Commands

## Overview

Minimal **copy-paste** command sequence to stand up a project matching this repo's stack. For numbered explanations and pitfalls, see [CONTEXT_SETUP.md](CONTEXT_SETUP.md). For full config files, see [.cursor/skills/react-quality-starter/reference.md](../../.cursor/skills/react-quality-starter/reference.md).

## When to Use This Doc

- Quick clone of the toolchain in a fresh directory.
- Pasting into a checklist or internal wiki without prose.

## When NOT to Use This Doc Alone

- First-time setup without reading **CONTEXT_SETUP** - you will miss ordering and axe/Chrome caveats.
- Changing **script names** or **ports** - update all dependents (Playwright, axe, docs) together.

## Create app

```bash
npm create vite@latest hello-app -- --template react
cd hello-app
npm install
```

## Runtime dependencies

```bash
npm install swr zustand
```

## Dev dependencies

```bash
npm install -D oxlint @axe-core/cli browser-driver-manager audit-ci eslint-plugin-security eslint-plugin-jsx-a11y
npm install -D knip size-limit @size-limit/preset-app prettier lint-staged
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D @playwright/test start-server-and-test husky lighthouse
npm install -D typescript typescript-eslint @vitest/coverage-v8 @vitest/ui
```

## Browser and axe tooling

```bash
npx playwright install chromium
npx browser-driver-manager install chrome@146
```

## Git and hooks

```bash
git init
npm run prepare
```

_(Run `npm run prepare` after `husky` is in `package.json` and `prepare` script is set - see reference.)_

## Add scripts and config files

Paste from [reference.md](../../.cursor/skills/react-quality-starter/reference.md):

- `package.json` `scripts` block
- `vite.config.ts`, `eslint.config.js`, `playwright.config.ts`, `tsconfig.json`
- `scripts/run-axe-check.mjs`, `scripts/run-zap-baseline.mjs`, `scripts/run-lighthouse.mjs`, `src/test/setupTests.ts`, `.husky/pre-commit`, `.husky/pre-push`

## Add CI/CD workflow (GitHub Actions)

Create `.github/workflows/ci-cd.yml` with:

- Trigger on `pull_request` and `push` to `main` + `master`
- Quality job:
  - `npm ci`
  - `npm run check:all`
  - `npm run test:all`
  - `npm run check:dast:zap` (set `DAST_TARGET_URL=http://host.docker.internal:5173`)
  - `npm run check:dast:lighthouse`
  - upload `reports/` and `dist/` artifacts
- Deploy job (GitHub Pages):
  - gated on quality success
  - push-only on `main`/`master`
  - set `VITE_BASE_PATH=/${{ github.event.repository.name }}/`
  - deploy `dist/` with `actions/deploy-pages`

## Verify everything

```bash
npm run check:all
npm run test:all
npm run precommit:verify
```

## Common Rationalizations

| Rationalization                | Reality                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------- |
| I'll add scripts later.        | Without scripts, later never matches pre-commit; add them before declaring done. |
| Skip `browser-driver-manager`. | Axe CLI path step fails; either install it or rewrite the axe script.            |
| `git init` not needed.         | Husky needs a git repo for hooks to apply.                                       |

## Red Flags

- Running verify **before** configs from `reference.md` exist.
- Different **Node** version than team CI without testing `npm ci`.

## Verification

- [ ] All three commands in **Verify everything** exit zero.
- [ ] `package.json` includes `precommit:verify`, `prepush:verify`, and `prepare` as in reference.
- [ ] CI workflow runs quality checks and Pages deploy is gated on quality.
