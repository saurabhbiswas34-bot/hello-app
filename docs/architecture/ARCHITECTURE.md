# Architecture

## Overview

This document describes **how this app is structured**: Atomic Design layers for UI, where data and global UI state live (SWR + Zustand), and how rendering flows from `App` into feature templates. It also maps **quality tooling** to that structure so architecture includes how we keep the codebase healthy.

**Related:** Setup recreation [../setup/CONTEXT_SETUP.md](../setup/CONTEXT_SETUP.md). Testing [../testing/TESTING_STRATEGY.md](../testing/TESTING_STRATEGY.md).

## When to Use This Doc

- Onboarding or explaining where a new feature should live (atom vs organism vs template).
- Tracing data from source hook UI.
- Aligning a refactor with existing boundaries (store vs local state).

## When NOT to Use This Doc as the Only Source

- **Exact file lists** drift; verify paths in the repo if this doc and code disagree **code wins**, then update this file.
- **Three.js / WebGL** integration is covered in [../threejs-react-guide.md](../threejs-react-guide.md), not here.

## UI Organization: Atomic Design

Components are grouped by responsibility:

| Layer       | Role                              | Example (this app) |
| ----------- | --------------------------------- | ------------------ |
| `atoms`     | Smallest reusable primitives      | Section title      |
| `molecules` | Small compositions                | Accordion item     |
| `organisms` | Feature-level groups              | Accordion list     |
| `templates` | Page-level layout and data wiring | Accordion template |

Paths live under `src/components/{atoms,molecules,organisms,templates}/`.

## Data Flow

### Data fetching

- **Source:** mock FAQ data (`src/data/mockFaqs.js`)
- **Hook:** `src/hooks/useAccordionData.js` (SWR `useSWR`)
- **Consumer:** template uses `{ items, isLoading, error }`

### State management

- **Store:** `src/store/useAccordionStore.js` (Zustand)
- **State:** `openItemId`
- **Action:** `toggleItem(itemId)`
- **Behavior:** same control toggles closed; another item opens and switches the active panel

### Rendering flow

1. `App` renders `AccordionTemplate`
2. `AccordionTemplate` loads data via the SWR hook
3. `AccordionList` maps items into `AccordionItem`
4. Each `AccordionItem` reads/writes open state through the Zustand store

## Quality Architecture

Automated quality is enforced outside the component tree: oxlint, ESLint (incl. security rules), `audit-ci`, axe against the dev server, Vitest, Playwright, and Husky running `precommit:verify`. **Commands, failure handling, and CI order** live in [../quality/QUALITY_GATES.md](../quality/QUALITY_GATES.md) so this file does not duplicate that reference.

## Common Rationalizations

| Rationalization                              | Reality                                                                                        |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Ill put API calls in the organism for speed. | Bloats reuse and testing; templates/hooks should own data wiring.                              |
| Global store for everything.                 | Prefer local state when only one subtree cares; Zustand here is for shared accordion UI state. |
| Atomic layers are bureaucracy.               | They keep PRs scoped and tests targetable; skip layers only with team agreement.               |
| Docs will stay in sync automatically.        | They wont update this file when flow or paths change.                                          |

## Red Flags

- Business logic **deep in atoms** (hard to test, wrong reuse boundary).
- SWR keys or fetchers **duplicated** across templates without a shared hook.
- Store shape **exported** everywhere instead of narrow selectors/actions.
- Circular imports between component layers.
- This documents paths **dont exist** in the tree (stale architecture doc).

## Verification

After structural or flow changes:

- [ ] Rendering flow above matches actual import/render chain.
- [ ] Data source and hook names match repo files.
- [ ] New components sit in the correct Atomic layer.
- [ ] Quality pipeline still matches [../quality/QUALITY_GATES.md](../quality/QUALITY_GATES.md) and `package.json` / Husky.
