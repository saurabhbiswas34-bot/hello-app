# Testing Strategy

## Scope split

Use unit tests for component logic and UI behavior in isolation.  
Use E2E tests for user journeys and integration behavior in a real browser.

## Unit tests (`src/**/*.test.jsx`)

Framework: Vitest + Testing Library

Cover:
- Rendering states (loading/error/success)
- Local interaction behavior (open/close accordion)
- Conditional UI rendering
- Hook/component interaction boundaries with mocks

Keep unit tests:
- Fast
- Deterministic
- Focused on one behavior per test

## E2E tests (`tests/e2e/*.spec.js`)

Framework: Playwright

Cover:
- Critical user path loads correctly
- Real browser interaction (click, keyboard if needed)
- End-to-end behavior across app state and rendering

Current critical flow:
- Open accordion item
- Validate content is visible
- Close accordion item
- Validate content is hidden

## Commands

- `npm run test:unit`
- `npm run test:e2e`
- `npm run test:all`

## Rule of thumb

- If logic can be validated without browser/server orchestration, write a unit test.
- If behavior depends on actual page runtime and integrated app flow, write an E2E test.
