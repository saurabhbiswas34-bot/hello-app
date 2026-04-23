# Quality Gates

## Overview

Quality in this repo is **layered**: fast static checks, accessibility, security lint + dependency audit, then tests and CI-only DAST. The **pre-commit hook** and CI jobs are designed so local green matches merge/deploy expectations.

**Related:** Testing scope - [../testing/TESTING_STRATEGY.md](../testing/TESTING_STRATEGY.md). Command cheat sheet - [../setup/BOOTSTRAP_COMMANDS.md](../setup/BOOTSTRAP_COMMANDS.md).

## When to Use This Doc

- Interpreting a failed `check:*` or `precommit:verify`.
- Adding CI steps or onboarding someone to the pipeline.
- Deciding whether a new check belongs in `check:all` vs tests only.

## When NOT to Treat Gates as Complete Product Quality

- Gates do not replace **code review**, **threat modeling**, or **manual exploratory** testing for UX.
- `audit-ci` at `--moderate` is a **policy choice**; stricter tiers may be required for regulated environments.

## Commands

| Command                    | Purpose                                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `npm run check:oxlint`     | Fast static analysis (oxlint)                                                                         |
| `npm run check:axe`        | Accessibility scan via axe-core CLI on running app                                                    |
| `npm run check:security`   | ESLint (incl. security plugin) + `check:vuln`                                                         |
| `npm run check:all`        | Full static quality chain (types, format, lint, reports, oxlint, deadcode, SAST, axe, security, size) |
| `npm run test:all`         | Unit + E2E tests                                                                                      |
| `npm run check:dast`       | ZAP + Lighthouse DAST sequence                                                                        |
| `npm run check:ci`         | `check:all` + `test:all` + `check:dast`                                                               |
| `npm run precommit:verify` | Project-defined pre-commit verification                                                               |
| `npm run prepush:verify`   | Fast pre-push guard (`lint` + `test:unit:changed`)                                                    |

**Implicit pieces:** `check:vuln` is `audit-ci --moderate`; `check:security` runs `npm run lint` then `check:vuln`.

## What Each Gate Validates

- **`check:oxlint`** - Code-quality and lint-style issues oxlint is configured to catch.
- **`check:axe`** - Automated a11y rules against `http://localhost:5173` while dev server is up (`start-server-and-test`). Requires working Chrome/ChromeDriver pathing for the axe CLI (see `scripts/run-axe-check.mjs`).
- **`check:security`** - ESLint including `eslint-plugin-security` recommendations plus dependency vulnerabilities via `audit-ci`.
- **`check:all`** - Full static/a11y/security/deadcode/size gate chain.
- **`test:all`** - Unit and E2E test execution.
- **`check:dast`** - ZAP baseline and Lighthouse checks.
- **`check:ci`** - End-to-end CI aggregate command.

## Failure Handling (Process)

1. **Lint / security plugin** - Fix reported issues; rerun `npm run lint`, then `npm run check:security`.
2. **Vulnerabilities** - Inspect `npm audit`; upgrade or patch packages; if exception is justified, document it and align with team policy, then rerun `npm run check:vuln`.
3. **Accessibility** - Fix semantics, roles, labels, contrast, focus; rerun `npm run check:axe`.
4. **DAST failures** - Confirm host routing model (`host.docker.internal` only for ZAP step), then rerun `npm run check:dast`.
5. **Pre-commit failure** - Run `npm run precommit:verify` locally until green; do not bypass without explicit team agreement.

## Recommended CI/CD Order

1. `npm ci`
2. `npm run check:all`
3. `npm run test:all`
4. `npm run check:dast`
5. On protected branch push: deploy GitHub Pages from built `dist/`.

## Local Hook Scopes

- `precommit:verify` should stay fast for staged files.
- `prepush:verify` can remain lightweight if CI still enforces full `check:all` + `test:all` + DAST.
- CI is the final quality authority for merge/deploy decisions.

Pages deploy is gated behind successful quality checks and should run only on push (not pull request).

## Common Rationalizations

| Rationalization                             | Reality                                                                                                |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| I'll merge with red axe; it's minor.        | Axe failures are regressions for users with assistive tech; fix or file a tracked exception with plan. |
| Oxlint is redundant with ESLint.            | Here both run by design; removing one changes the contract - get explicit approval.                    |
| audit-ci is too noisy; I'll disable it.     | That trades known risk for silence; tune threshold or fix deps instead of deleting the gate silently.  |
| Pre-commit is slow; I'll use `--no-verify`. | Bypasses the team bar; only for emergencies with follow-up.                                            |
| Green `lint` means secure.                  | Security is lint + dependency audit + architecture; the gate is necessary not sufficient.              |

## Red Flags

- `precommit:verify` and CI run **different** commands (drift between hook and pipeline).
- Port **5173** in scripts does not match actual dev server configuration.
- Axe passes on an **empty** or error page while the real UI is broken (wrong URL or timing).
- `DAST_TARGET_URL` leaked globally to non-ZAP checks (e.g. Lighthouse pointing at wrong host).
- Vulnerabilities **suppressed** in config without review record.
- `check:all` green but tests/DAST skipped in what developers think is full verification.

## Verification

After changing scripts, hooks, or gate tooling:

- [ ] `npm run check:all` succeeds.
- [ ] `npm run test:all` succeeds.
- [ ] `npm run precommit:verify` succeeds end-to-end.
- [ ] `.husky/pre-commit` still invokes the same pipeline as `precommit:verify`.
- [ ] CI order matches the recommended sequence (or differences are documented).
