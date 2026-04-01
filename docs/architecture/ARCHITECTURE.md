# Architecture

## UI organization: Atomic Design

The UI is structured by component responsibility:

- `atoms`: smallest reusable primitives (e.g., section title)
- `molecules`: small composed components (e.g., accordion item)
- `organisms`: grouped feature-level components (e.g., accordion list)
- `templates`: page-level layout and data wiring (e.g., accordion template)

## Data and state flow

## Data fetching

- Source: mock FAQ data (`src/data/mockFaqs.js`)
- Fetch hook: `src/hooks/useAccordionData.js`
- Fetching library: SWR (`useSWR`)
- Template consumes `{ items, isLoading, error }`

## State management

- Global UI state: `src/store/useAccordionStore.js`
- State:
  - `openItemId`
- Action:
  - `toggleItem(itemId)`
- Behavior:
  - clicking same item closes it
  - clicking another item switches active accordion panel

## Rendering flow

1. `App` renders `AccordionTemplate`
2. `AccordionTemplate` fetches data via SWR hook
3. `AccordionList` maps items into `AccordionItem`
4. Each `AccordionItem` reads/writes open state through Zustand store

## Quality architecture

- Static checks: ESLint + Oxlint
- Security checks: ESLint security rules + `audit-ci`
- Accessibility checks: axe-core CLI
- Testing:
  - Unit: Vitest + Testing Library
  - E2E: Playwright
- Commit gate: Husky pre-commit runs full verification pipeline
