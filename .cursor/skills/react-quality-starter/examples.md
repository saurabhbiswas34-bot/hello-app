# Examples

## Example 1: Bootstrap full starter

### Prompt

Create a new React app with Atomic Design, Zustand for state, SWR for data fetching, unit tests, Playwright E2E, security checks, and a pre-commit hook.

### Expected outcome

- App scaffolded with Vite React.
- Component structure:
  - `src/components/atoms`
  - `src/components/molecules`
  - `src/components/organisms`
  - `src/components/templates`
- Zustand + SWR wired into a sample feature.
- Unit test(s) under `src/**/*.test.jsx`.
- E2E test(s) under `tests/e2e`.
- Scripts for lint/security/vuln/a11y/tests/precommit added.
- Husky pre-commit hook runs full verification pipeline.

## Example 2: Add quality gates to existing app

### Prompt

I already have a React app. Add oxlint, accessibility scan, vulnerability check, and pre-commit verification.

### Expected outcome

- Installs tooling:
  - `oxlint`
  - `@axe-core/cli`
  - `browser-driver-manager`
  - `audit-ci`
  - `eslint-plugin-security`
  - `husky`
- Adds scripts:
  - `check:oxlint`
  - `check:axe`
  - `check:vuln`
  - `check:security`
  - `check:all`
  - `precommit:verify`
- Adds `.husky/pre-commit` running `npm run precommit:verify`.

## Example 3: Add testing to existing feature

### Prompt

Add unit and Playwright tests for my accordion component and make sure all tests pass.

### Expected outcome

- Unit test validates open/close behavior and rendering.
- Playwright test validates user flow in real browser.
- `test:unit`, `test:e2e`, and `test:all` scripts added/updated.
- Playwright browser installed with `npx playwright install chromium`.
- All tests pass successfully.

## Example 4: Diagnose failing pre-commit

### Prompt

My pre-commit hook fails. Fix the pipeline and make it green.

### Expected outcome

- Run `npm run precommit:verify`.
- Identify failing gate (lint, a11y, vuln, unit, or e2e).
- Apply focused fix.
- Re-run until all checks pass.
- Keep changes minimal and deterministic.

## Example 5: Regenerate docs for team reuse

### Prompt

Create reusable docs for setup commands, quality gates, testing strategy, and architecture.

### Expected outcome

- `docs/setup/BOOTSTRAP_COMMANDS.md`
- `docs/quality/QUALITY_GATES.md`
- `docs/testing/TESTING_STRATEGY.md`
- `docs/architecture/ARCHITECTURE.md`
- Docs are concise, copy-paste friendly, and aligned with package scripts.
