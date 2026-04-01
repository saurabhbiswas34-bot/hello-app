# Quality Gates

This project enforces quality with layered checks.

## Commands

- `npm run check:oxlint`
- `npm run check:axe`
- `npm run check:security`
- `npm run check:all`
- `npm run precommit:verify`

## What each gate validates

- `check:oxlint`
  - Fast static analysis and code-quality rules.
- `check:axe`
  - Accessibility scan on the running app using `axe-core` CLI.
  - Uses `start-server-and-test` so server starts automatically.
- `check:security`
  - `npm run lint`: ESLint rules including `eslint-plugin-security`.
  - `npm run check:vuln`: dependency vulnerability scan via `audit-ci --moderate`.
- `check:all`
  - Runs oxlint + accessibility + security gates.
- `precommit:verify`
  - Runs all quality gates plus all tests before commit.

## Failure handling

- Lint/security errors:
  - Fix code issues and rerun `npm run lint`.
- Vulnerabilities:
  - Run `npm audit` and update affected packages.
  - Re-run `npm run check:vuln`.
- Accessibility failures:
  - Fix semantic/accessibility issues in UI and rerun `npm run check:axe`.
- Failing gate before commit:
  - Run `npm run precommit:verify` locally until green.

## Recommended CI order

1. `npm ci`
2. `npm run check:all`
3. `npm run test:all`
