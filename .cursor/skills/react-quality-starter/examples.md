# Examples

## Example 1: Bootstrap full starter

### Prompt

Create a new React app with Atomic Design, React useReducer state, SWR for data fetching, unit tests, Playwright E2E, security checks, and a pre-commit hook.

### Expected outcome

- App scaffolded with Vite React.
- Component structure:
  - `src/components/atoms`
  - `src/components/molecules`
  - `src/components/organisms`
  - `src/features/<feature>`
  - `src/app`
- `useReducer` + SWR wired into a sample feature.
- Unit test(s) under `src/**/*.test.{ts,tsx}`.
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

Add unit and Playwright tests for my users route and make sure all tests pass.

### Expected outcome

- Unit test validates route rendering and loading/error/success states.
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

## Example 6: Add reusable component (Atomic Design)

### Prompt

Create a reusable `Badge` component and use it in the Users list UI. Follow Atomic Design and keep CSS near the component.

### Expected outcome

- `Badge` added under the correct layer (typically `src/components/atoms/Badge.tsx`).
- `Badge.css` and `Badge.test.tsx` are co-located.
- Call sites import and use `Badge` without embedding badge styles inline.
- Tests and lint/type checks pass after integration.

## Example 7: Modify existing component API

### Prompt

Update `AccordionItem` to support an optional `onFocus` callback and keep backward compatibility.

### Expected outcome

- Component props updated with proper TypeScript typing.
- Existing callers keep working; affected callers updated if required.
- Component tests updated for old and new behavior.
- No feature-route behavior changed unintentionally.

## Example 8: Remove a component safely

### Prompt

Remove the `Accordion` page component and its CSS, and clean up all references.

### Expected outcome

- Component files removed.
- Route and navigation references removed.
- Related tests updated to reflect new behavior.
- Docs updated so removed component is not still documented.
- Typecheck/lint/tests pass after cleanup.

## Example 9: Remove a feature safely

### Prompt

Remove the FAQ feature route entirely and keep Users and Home working.

### Expected outcome

- Feature route removed from `App.tsx`.
- Navbar entry removed.
- Feature files and tests removed or updated.
- Architecture/testing docs reflect new route set.
- No dead imports or orphan files remain.
