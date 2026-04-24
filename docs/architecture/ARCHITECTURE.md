# Architecture

## Overview

This app is a Vite + React + TypeScript SPA with:

- `react-router-dom` for route navigation
- SWR hooks for feature data fetching
- React `useReducer` + context for accordion open/close UI state
- Atomic Design-inspired UI folders (`atoms`, `molecules`, `organisms`)
- feature-first folders for pages and feature-owned types

Related docs:

- Setup flow: [../setup/CONTEXT_SETUP.md](../setup/CONTEXT_SETUP.md)
- Quality checks: [../quality/QUALITY_GATES.md](../quality/QUALITY_GATES.md)
- Testing scope: [../testing/TESTING_STRATEGY.md](../testing/TESTING_STRATEGY.md)
- Component conventions: [../conventions/COMPONENT_GUIDE.md](../conventions/COMPONENT_GUIDE.md)
- Feature conventions: [../conventions/FEATURE_GUIDE.md](../conventions/FEATURE_GUIDE.md)

## High-Level Flow

1. `src/app/main.tsx` mounts `App` and global `index.css`.
2. `src/app/App.tsx` defines routes and lazy-loads page components.
3. `src/app/AppShell.tsx` renders shell layout and `Navbar`, then route content via `Outlet`.
4. Feature pages (`Home`, `Users`) fetch/render data through feature hooks and reusable UI components.

## Folder Model

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
  types/
    accordion.ts   # shared contract
```

### Ownership rules

- Feature-owned contracts live in feature folders (for example `features/users/types/user.ts`).
- Truly shared contracts remain in `src/types` (for example `accordion.ts` when reused by shared components).
- Shared reusable UI lives in `src/components`.
- Route pages live in `src/features/*` and are mounted from `src/app/App.tsx`.
- React app code is TypeScript-only (`.tsx` for components/pages, `.ts` for modules).

### Atomic Design placement rules

- `atoms`: smallest reusable primitives; no feature fetch/store logic
- `molecules`: small compositions of atoms
- `organisms`: larger reusable compositions used across pages/features
- Feature page wiring belongs in `src/features`, not in shared atoms/molecules

## Routing and Page Composition

Routes currently exposed:

- `/` -> `Home`
- `/users` -> `Users`

`App` uses `React.lazy` + `Suspense` for route-level code splitting.

## Data and State

### API endpoints

- Centralized in `src/config/api.ts`
- Uses `VITE_API_BASE_URL` with `https://dummyjson.com` fallback
- Hooks consume `API_ENDPOINTS` instead of hardcoded URLs

### Feature hooks

- `features/users/hooks/useUsersData.ts`

Hook return shapes:

- `useUsersData` returns `{ items, isLoading, error }` for accordion rendering.

### Accordion UI state

- `components/organisms/Accordion/store/AccordionStoreProvider.tsx`
- `components/organisms/Accordion/store/useAccordionStore.ts`
- `components/organisms/Accordion/store/accordionReducer.ts`
- `components/organisms/Accordion/store/accordionContext.ts`
- Used by `components/molecules/AccordionItem.tsx`
- Implements reducer-driven state with a split provider/hook/reducer/context design for consistent accordion behavior

## Styling

- `src/index.css` contains global tokens, base elements, and global layout primitives only.
- Component/feature styles are co-located (`*.css` next to `*.tsx`).
- BEM is mandatory for all component/feature CSS classes (`block__element--modifier`).

## Quality Architecture

Quality gates and test orchestration are script-driven from `package.json` and enforced by Husky and CI.

- Static checks: TypeScript, ESLint, oxlint, dead code, size
- Security/a11y: ESLint security rules, dependency audit, axe
- Tests: Vitest and Playwright
- CI deploy: quality-gated GitHub Pages

## Red Flags

- New feature added without route/nav update when discoverability is expected
- Feature types added under `src/types` when they are only used by one feature
- Hardcoded API URLs inside hooks/components
- Styling added to `index.css` for component-specific rules
- Docs referencing deleted paths or legacy JS files
- Feature/component removed in code but still present in route/nav/docs/tests

## Verification

After structural changes:

- [ ] `npm run check:all` passes
- [ ] `npm run test:all` passes
- [ ] Routes/pages in this doc match `src/app/App.tsx`
- [ ] Type ownership rules still hold (feature-local vs shared)
- [ ] New/updated components are placed in the correct Atomic layer
