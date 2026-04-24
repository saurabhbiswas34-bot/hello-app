# Feature Guide

## Overview

This guide defines how to add, modify, and remove features in this project while keeping routing, architecture, tests, and docs consistent.

## Feature vs Component (explicit rule)

- **Feature**: a route-level or business-level capability under `src/features` that coordinates page UI, hooks, data, and behavior.
- **Component**: a reusable UI unit under `src/components` based on Atomic Design (atoms/molecules/organisms).
- **Boundary**: features assemble components to deliver business behavior; reusable components should not absorb feature-specific routing/business flow.
- See also: `docs/conventions/COMPONENT_GUIDE.md`.

## Feature folder shape

Use this structure for each feature:

```text
src/features/<feature>/
  <Feature>.tsx
  <Feature>.css
  hooks/
  types/
  utils/        # optional
```

Rules:

- Feature-owned types stay in `src/features/<feature>/types`.
- Shared cross-feature types stay in `src/types`.
- Reusable UI stays in `src/components`, not in feature folders.
- Reusable UI classification follows Brad Frost's Atomic Design methodology.
- BEM is mandatory: all feature/page CSS must follow `block__element--modifier`.
- TypeScript is mandatory: use `.tsx` for components/pages and `.ts` for hooks/types/utils.

## Add a feature

Checklist:

- Add page component and co-located CSS in feature folder.
- Ensure new feature CSS follows `block__element--modifier`.
- Add/update route in `src/app/App.tsx`.
- Add/update navigation entry in `src/components/organisms/Navbar/Navbar.tsx` when user discoverability is needed.
- Add feature hook(s) under `hooks/` for data fetching.
- Add/update API endpoint constants in `src/config/api.ts` (no hardcoded URLs).
- Add or update **unit tests** (Vitest): co-located `*.test.ts` / `*.test.tsx` next to the feature page, hooks, and utils you touch—cover loading, error, empty, and happy paths where they apply.
- Add or update **E2E tests** (Playwright): specs under `tests/e2e/` for the new or changed route(s), navigation, and critical user-visible behavior (see `playwright.config.ts`).
- Update docs (`docs/architecture/ARCHITECTURE.md` and related guides) if flow changes.
- Keep feature code in TypeScript; do not introduce `.js`/`.jsx` files.

## Modify a feature

Checklist:

- Keep route/path contracts stable unless change is explicitly requested.
- Prefer in-place updates to avoid unnecessary churn.
- Keep feature-owned type changes inside feature `types/`.
- Update hooks/selectors/mappers with behavior changes.
- Update **unit tests** and **E2E tests** for changed behavior (not only snapshots).
- Update docs where behavior or flow changed.
- Keep or migrate touched feature CSS to `block__element--modifier`.

## Remove a feature

Checklist:

- Remove route entry from `src/app/App.tsx`.
- Remove nav/UI entry points (for example navbar links).
- Remove feature files (`<Feature>.tsx`, CSS, hooks, types, utils as applicable).
- Remove or update related tests.
- Remove now-unused shared code only after confirming no references remain.
- Update docs to remove stale references.

## Routing and code splitting conventions

- Keep feature pages route-driven from `src/app/App.tsx`.
- Prefer route-level lazy loading (`React.lazy` + `Suspense`) for feature pages.
- Keep fallback UX simple and testable.

## Testing (unit and E2E)

Both layers are required for feature work unless the change is documentation-only.

| Layer    | Tool                            | Where                                   | Purpose                                                                                              |
| -------- | ------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Unit** | Vitest (`npm run test:unit`)    | `src/**/*.test.{ts,tsx}` next to source | Fast feedback: hooks, mappers, page states (loading/error/data), mocked `fetch` or SWR where needed. |
| **E2E**  | Playwright (`npm run test:e2e`) | `tests/e2e/*.spec.ts`                   | Real browser: routes, nav, and integration against the dev server (see `playwright.config.ts`).      |

`npm run test:all` runs unit tests then E2E; use it before calling a feature change done.

## Data and API conventions

- Use SWR hooks for feature data fetching.
- Keep endpoint definitions centralized in `src/config/api.ts`.
- Use `VITE_API_BASE_URL` for environment-specific API host overrides.
- Avoid direct hardcoded URLs in feature hooks/components.

## Verification

After feature add/modify/remove:

- `npm run check:all`
- `npm run test:all` (runs **unit** then **E2E**; or run `npm run test:unit` and `npm run test:e2e` separately while iterating)
- Confirm docs match actual routes and feature flow.
- Before merge: multi-axis review per [../code-review/CODE-REVIEW.md](../code-review/CODE-REVIEW.md).
