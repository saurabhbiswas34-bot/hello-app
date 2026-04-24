# Testing Strategy

## Overview

This document defines **how we split tests** in this repo (Vitest + Testing Library for units, Playwright for E2E), what belongs in each layer, and how to know a change is proven. It complements `package.json` scripts and the pre-commit pipeline described in [../quality/QUALITY_GATES.md](../quality/QUALITY_GATES.md).

**Related docs:** Run commands from [../setup/BOOTSTRAP_COMMANDS.md](../setup/BOOTSTRAP_COMMANDS.md) when you need a paste list; component and data boundaries for tests [../architecture/ARCHITECTURE.md](../architecture/ARCHITECTURE.md).
Also see implementation conventions:

- [../conventions/COMPONENT_GUIDE.md](../conventions/COMPONENT_GUIDE.md)
- [../conventions/FEATURE_GUIDE.md](../conventions/FEATURE_GUIDE.md)

## When to Use This Doc

- Adding or changing tests for UI, hooks, or flows.
- Deciding whether a case belongs in unit vs E2E.
- Reviewing a PR for adequate proof (not just coverage theater).

## When NOT to Rely on It Alone

- **Security or accessibility** acceptance those have separate gates (`check:security`, `check:axe`); tests do not replace them.
- **Performance contracts** strategy here is functional correctness; perf needs measurement and budgets elsewhere.

## Scope Split

| Layer    | Role                                                     | Tooling                                             |
| -------- | -------------------------------------------------------- | --------------------------------------------------- |
| **Unit** | Component logic, UI states, interactions in isolation    | Vitest + Testing Library (`src/**/*.test.{ts,tsx}`) |
| **E2E**  | User journeys in a real browser, integrated app behavior | Playwright (`tests/e2e/*.spec.js`)                  |

**Rule of thumb:** If you can prove behavior without spinning a server and driving the full page, prefer a unit test. If the bug is about real DOM, routing, or cross-component integration, prefer E2E.

## Unit Tests (`src/**/*.test.{ts,tsx}`)

**Framework:** Vitest + Testing Library.

**Cover:**

- Rendering states (loading / error / success)
- Local interaction (e.g. open/close accordion)
- Conditional UI
- Boundaries between hooks and components (with mocks where I/O would slow or flake)

**Keep unit tests:**

- Fast
- Deterministic
- One primary behavior per test (multiple assertions for one scenario are fine; multiple unrelated scenarios in one test are not)

## E2E Tests (`tests/e2e/*.spec.js`)

**Framework:** Playwright.

**Cover:**

- Critical path loads and responds
- Real input (click, keyboard where relevant)
- Flow across state and rendering

**Current critical flows (examples):**

- App shell route navigation (`/`, `/users`, `/products`)
- Users page rendering with data mapping
- Products page rendering with grid/cards
- Accordion item open/close behavior where used

Extend E2E when a path is **user-visible** and **regression-prone** not for every permutation.

## Commands

- `npm run test:unit`
- `npm run test:e2e`
- `npm run test:all`

## Common Rationalizations

| Rationalization                               | Reality                                                                                |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| Ill only add E2E; it covers everything.       | E2E is slower and flakier; you lose fast feedback and precise failure localization.    |
| Unit tests arent needed if Playwright passes. | Regressions in edge states (error UI, empty lists) often never hit the happy-path E2E. |
| Ill skip tests; the types are enough.         | Types dont prove behavior, timing, or user-visible states.                             |
| One giant E2E is faster to write.             | Its slower to debug when it breaks; split by journey or scenario.                      |
| Ill mock everything in unit tests.            | Mock only at system boundaries; over-mocking tests the mock, not the app.              |

## Red Flags

- New feature or bugfix with **no** test movement (new/changed test or explicit rationale in PR).
- E2E suite that **only** checks page loads for every feature.
- Unit tests that **hit the network** or depend on execution order.
- Flaky E2E fixed only with `sleep` / arbitrary timeouts instead of proper waits/assertions.
- `test:all` red but commit attempted anyway.

## Verification

Before treating testing work as complete:

- [ ] `npm run test:unit` passes.
- [ ] `npm run test:e2e` passes.
- [ ] `npm run test:all` passes (matches what pre-commit expects for tests).
- [ ] New behavior has a **targeted** unit test and/or E2E, not only incidental coverage.
- [ ] No new flakiness (rerun E2E at least once if you touched timing or network).
