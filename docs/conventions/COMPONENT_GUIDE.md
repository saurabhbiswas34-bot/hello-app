# Component Guide

## Overview

This guide defines how to add, modify, and remove reusable components using Atomic Design in this project.

## Component vs Feature (explicit rule)

- **Component**: reusable UI building block in `src/components` (atoms, molecules, organisms). It should be portable across pages/features and should not own route-level business flow.
- **Feature**: user-facing business capability in `src/features` (for example the users list). It owns page composition, data hooks, and route behavior.
- **Boundary**: features compose components; components do not become feature containers.
- See also: `docs/conventions/FEATURE_GUIDE.md`.

## Language Rule (mandatory)

TypeScript is mandatory for React code in this project.

- Use `.tsx` for React components.
- Use `.ts` for non-JSX module code (hooks, utils, types, store).
- Do not add new `.js` or `.jsx` files for app code.

## CSS Architecture (mandatory)

BEM is mandatory: all component CSS must follow `block__element--modifier`.

- Use `block__element--modifier` naming consistently.
- Keep class names semantic and component-scoped.
- Do not introduce non-BEM ad-hoc class naming patterns.
- Keep component CSS co-located with the component file.

## Atomic Design placement

This project follows **Brad Frost's Atomic Design methodology**:

- Reference: [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/).

- `atoms`: smallest primitives; no feature-level data fetching or store orchestration
- `molecules`: small compositions of atoms
- `organisms`: larger reusable compositions used across features/pages

Feature page wiring belongs in `src/features`, not inside shared atoms/molecules.

## Add a component

Use co-located files where practical:

```text
src/components/<layer>/<Name>.tsx
src/components/<layer>/<Name>.css
src/components/<layer>/<Name>.test.tsx
```

Checklist:

- Place in the correct Atomic layer
- Keep props typed and minimal
- Keep styles co-located and follow `block__element--modifier`
- Add/update **Vitest unit tests** (`<ComponentName>.test.tsx`) for behavior
- Update caller imports
- Keep component code in TypeScript (`.tsx` / `.ts`)

## Modify a component

Checklist:

- Keep API backward compatible where possible
- If prop API changes, update all callers in same change
- Update **Vitest unit tests** for both existing and new behavior
- Confirm no feature route behavior regresses unintentionally
- Preserve existing BEM class naming when extending styles
- If component state orchestration grows, prefer React `useReducer` + context with clear file roles (provider, hook, reducer, context)

Recommended file template:

```text
src/components/<layer>/<ComponentName>/
  <ComponentName>.tsx                # UI composition
  <ComponentName>.css                # BEM styles
  <ComponentName>.test.tsx           # behavior tests
  store/
    <ComponentName>Provider.tsx      # context provider + useReducer wiring
    use<ComponentName>Store.ts       # hook to consume context safely
    <componentName>Reducer.ts        # reducer + actions + initial state
    <componentName>Context.ts        # context object and value type
```

Use this template when state is shared across multiple child components of the same reusable component boundary.

## Remove a component

Checklist:

- Remove component file, CSS, and test
- Remove all imports/usages
- Remove related route/nav references if tied to navigation
- Remove dead exports (if using barrel exports)
- Update architecture/testing docs if behavior surface changed

## Verification

- `npm run check:all`
- `npm run test:all`
- Ensure no stale references remain in docs and examples
- Before merge: multi-axis review per [../code-review/CODE-REVIEW.md](../code-review/CODE-REVIEW.md)
