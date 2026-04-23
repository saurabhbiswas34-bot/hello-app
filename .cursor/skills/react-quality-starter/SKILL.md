---
name: react-quality-starter
description: Creates a Vite React starter with Atomic Design folders, React useReducer state, SWR data hook, quality/security checks, accessibility checks (axe), unit tests (Vitest), E2E tests (Playwright), Husky hooks, and CI/CD guidance. Use when the user asks to bootstrap a React project with production-ready quality gates, to add the same gates to an existing Vite React app, or to add/modify a feature inside an app already on this stack.
---

# React Quality Starter

## Overview

This skill encodes a bootstrap workflow and a feature-change workflow for a Vite + React app with a consistent folder model, layered quality gates (lint, oxlint, security ESLint, dependency audit, axe, deadcode, bundle-size), automated tests (Vitest, Playwright), Husky hooks, and CI/CD deployment guidance. The outcome is a repo where "green locally" means the same bar you want before merge.

Current preferred architecture in this repo:

- app shell + route pages (`src/app/App.tsx`, `src/app/AppShell.tsx`)
- route-level lazy loading (`React.lazy` + `Suspense`)
- feature-first folders (`src/features/<name>`)
- feature-owned types in feature folders
- TypeScript-only React code (`.tsx` for components/pages, `.ts` for modules)
- co-located CSS per component/feature
- BEM is mandatory for all component/feature CSS (`block__element--modifier`)
- API endpoints centralized in `src/config/api.ts`

**Progressive disclosure:** Use this file for process and gates. Copy-paste configs and scripts live in [reference.md](reference.md). Prompt-to-outcome examples live in [examples.md](examples.md).

## When to Use

- Starting a **new** React SPA with Vite and wanting Atomic Design + useReducer + SWR + tests + pre-commit gates.
- An **existing** Vite React app needs oxlint, axe, `audit-ci`, security lint, Vitest, Playwright, and/or Husky pre-commit wired like this skill.
- A repo already on this stack is getting a **new feature**, or an **existing feature** is being changed.
- The user explicitly wants a "production-ready starter" or the same tooling stack named in the description.

## When NOT to Use

- **Not** Vite/React (e.g. Next.js-only, Remix, Angular) - adapt the ideas, do not blindly run these commands.
- **Greenfield backend or CLI** with no React UI - wrong skill.
- User only wants **one** isolated change (e.g. "add Playwright only") - scope down; still follow verification at the end for what you touched.
- Monorepo or custom package layout - confirm paths, ports (`5173`), and script names before applying defaults.

## Core Behaviors (non-negotiable)

1. **Classify the task first** (see Phase 0). Announce the classification - bootstrap, adopt-tooling, feature-addition, feature-modification, feature-removal, component-addition, component-modification, or component-removal - in one sentence before writing code. If ambiguous, ask.
2. **Surface assumptions** before large edits - Node/npm present, app name/path, port 5173 available, Windows vs Unix for axe Chrome paths (see [reference.md](reference.md) for the Windows-oriented script).
3. **Stop on confusion** - if `package.json` already has conflicting scripts or ESLint flat config differs, name the conflict and resolve before pasting duplicate blocks.
4. **Scope discipline** - add only the tooling and files this stack needs; do not refactor unrelated features or delete code you do not own. Existing features are **canon**, not dead code.
5. **Doc-code parity** - if the change affects files, flows, or names referenced in `docs/**/*.md`, update those docs in the same change. A green pipeline with stale docs is an incomplete change.
6. **Verify with evidence** - task is not done until listed commands succeed; "configured" without a green run is incomplete.

## Process

Work in **increments** that keep the project installable and runnable after each logical step (deps -> config -> scripts -> hooks -> verify).

### Phase 0 - Classify the task (do this FIRST, always)

Before touching anything, determine which task type applies by inspecting the repo and the user's intent:

| Task type                           | Signals                                                                                                                     | What to do                                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Bootstrap (new project)**         | No `package.json`, empty dir, or user says "create / start / bootstrap".                                                    | Run Phases 1-6 in full.                                                                                           |
| **Adopt tooling into existing app** | `package.json` exists, Vite+React present, but quality gates missing. User says "add gates / add testing / add pre-commit". | Run Phases 2, 4, 5 only. Do NOT touch features.                                                                   |
| **Feature addition**                | User says "add feature/page/route".                                                                                         | Add alongside existing features with navigation/route updates.                                                    |
| **Feature modification**            | User names an existing feature and asks to change behavior.                                                                 | Edit in place; keep route and contracts stable unless explicitly requested.                                       |
| **Component addition**              | User asks to create reusable UI piece (`Button`, `Card`, `Navbar`, `AccordionList`).                                        | Place by Atomic layer under `src/components`, co-locate CSS/tests, keep props typed, avoid feature logic leakage. |
| **Component modification**          | User asks to update/refactor existing reusable UI component.                                                                | Update in place, keep component API stable or document breaking prop changes and update all callers/tests.        |
| **Component removal**               | User asks to delete a reusable component.                                                                                   | Remove component + CSS/tests + dead exports/imports; verify no runtime references remain.                         |
| **Feature removal**                 | User asks to delete a route/page/feature.                                                                                   | Remove route/nav entry, feature files, tests/docs references, and any now-orphaned shared code only if unused.    |

**Tie-breakers when the user's request is ambiguous:**

- Default assumption for "add / create / build a X" is **feature addition**, not replacement. If in doubt, ask: _"Should this replace the current home view, or live alongside it with navigation?"_
- If you are about to change what `App.tsx` renders and the task is **not** bootstrap, stop and confirm with the user first.
- When adding a feature, prefer `react-router-dom` with explicit routes (`BrowserRouter`, `Routes`, `Route`, `NavLink`). Use no-dependency toggles only if the user explicitly asks to avoid router dependencies.

Announce the classification and the coexistence plan in one sentence before writing code. Example: _"Classified as feature addition; I'll mount the new Docs Explorer next to the existing Accordion via a tab in an `AppShell` template."_

### Phase 1 - Scaffold or align

1. **New app:** `npm create vite@latest <app-name> -- --template react`, then `cd` and `npm install`.
2. **Existing app:** Read `package.json`, `vite.config.*`, `eslint.config.*`, and `playwright.config.*` (if any). Plan minimal diffs.

### Phase 2 - Dependencies

1. Runtime: `swr`.
2. Dev: `oxlint`, `@axe-core/cli`, `browser-driver-manager`, `audit-ci`, `eslint-plugin-security`, Vitest + Testing Library + `jsdom`, `@playwright/test`, `start-server-and-test`, `husky`.
3. One-time binaries: `npx playwright install chromium`, `npx browser-driver-manager install chrome@146` (adjust Chrome major if the project standard differs - document the choice).

### Phase 3 - Layout

Create a feature-first + reusable-components layout:

- `src/app` for router/shell
- `src/components/{atoms,molecules,organisms}` for reusable UI
- `src/features/<feature>/{<Feature>.tsx,hooks,types}`
- `src/config` for runtime config (`api.ts`)
- `src/types` only for truly shared contracts
- `src/test`, `tests/e2e`, `scripts`, `.husky`

Prefer co-located styles (`Component.tsx` + `Component.css`) and keep `src/index.css` global-only.

### Phase 4 - Config and scripts

1. Add **`package.json` scripts** exactly as needed for this stack (names: `test:unit`, `test:e2e`, `test:all`, `check:oxlint`, `check:axe`, `check:vuln`, `check:security`, `check:all`, `precommit:verify`, `prepare`). Full JSON block: [reference.md](reference.md).
2. **Vite + Vitest:** `environment: jsdom`, `setupFiles`, `globals`, `include` for `src/**/*.test.{ts,tsx}` in TS projects. Full file: [reference.md](reference.md).
3. **ESLint:** extend `eslint-plugin-security` recommended; test files get Vitest globals. Full file: [reference.md](reference.md).
4. **Playwright:** `testDir`, `baseURL`, `webServer` with dev server on `5173`, `reuseExistingServer: true`, and reporters to `reports/e2e`. Full file: [reference.md](reference.md).
5. **Axe:** `scripts/run-axe-check.mjs` resolving Chrome/ChromeDriver from browser-driver-manager; wire `check:axe` via `start-server-and-test`. Full script: [reference.md](reference.md).

### Phase 5 - Pre-commit

1. `.husky/pre-commit` runs `npm run precommit:verify`.
2. `npm run prepare` (and `git init` if new repo) so Husky installs.

### Phase 6 - Sample wiring (if greenfield)

- Optional but typical: one SWR-based data hook, a `useReducer` state slice with context, and a small UI flow so unit + E2E tests have a real target. Keep sample code **minimal** and aligned with project naming.

### Phase 7 - Change work (feature/component)

Only when the classification is **feature-addition**, **feature-modification**, **feature-removal**, **component-addition**, **component-modification**, or **component-removal**:

1. **Read `docs/architecture/ARCHITECTURE.md` before coding.** If your change will alter the rendering flow, data source, or top-level App mount, plan the doc update in the same change - that doc's own Red Flags call out staleness as a defect.
2. **Feature addition implies coexistence.** The default mental model is: there is already a feature at the home route; you are adding a sibling feature. Provide navigation. Never replace the app render target silently.
3. **Preserve existing contracts.** Keep existing components, hooks, stores, CSS classes, and tests working unless the user explicitly asks for removal. Existing e2e specs must keep passing (or be updated in step with code, not deleted).
4. **Adding a dependency:** State the bundle-size delta and run `npm run check:size`. Justify anything heavy (markdown parsers, date libs, UI kits). Prefer native HTML and existing deps first.
5. **Custom interactive widgets:** Custom tree / tabs / menu / combobox need a documented keyboard plan (arrow keys, Home/End, Enter) and the correct ARIA composite roles (`role="tree"` -> `role="treeitem"` children, `role="tablist"` -> `role="tab"` + `role="tabpanel"`, etc.). Prefer native HTML equivalents when the semantics fit.
6. **One data source per concern:** A component should not read the same state from both props and store for the same concept.
7. **No hardcoded endpoints:** API URLs must come from config (for example `src/config/api.ts`) and env (`VITE_API_BASE_URL` fallback model).
8. **Types ownership:** Feature-only types belong in `features/<name>/types`; shared cross-feature types belong in `src/types`.
9. **Component placement by Atomic Design:**
   - atoms: smallest primitives, no feature-specific fetching/store logic
   - molecules: small compositions of atoms
   - organisms: feature-level reusable compositions
   - page/route wiring stays in `src/features` and `src/app`, not inside shared atoms/molecules
10. **Co-located styling/tests:** for component changes, keep `Component.tsx`, `Component.css`, and `Component.test.tsx` together where practical.
11. **BEM is mandatory:** all new or modified CSS must follow `block__element--modifier` naming.
12. **TypeScript is mandatory:** new/updated React app code must use `.tsx` / `.ts`; do not add `.jsx` / `.js` feature/component files.
13. **Reducer/context split pattern:** when component state orchestration is shared across child components, prefer this file split:
    - `<ComponentName>Provider.tsx` (provider + `useReducer`)
    - `use<ComponentName>Store.ts` (safe context hook)
    - `<componentName>Reducer.ts` (reducer + actions + initial state)
    - `<componentName>Context.ts` (context object + value type)
14. **Content-folder globs:** `import.meta.glob({ eager: true, query: '?raw' })` is fine for tens of files; plan lazy loading before 50+ files. Note the trade-off to the user when you use it.

### Phase 7A - Removal protocol (feature/component)

When removing a feature or component:

1. Remove **all references first** (imports, routes, nav items, tests, CSS imports).
2. Remove files only after reference cleanup.
3. Update docs in the same change:
   - `docs/architecture/ARCHITECTURE.md`
   - setup/testing docs if commands/flows changed
   - skill examples/reference if conventions changed
4. Re-run typecheck/lint/tests and deadcode checks to ensure no orphans.

### Phase 8 - Observability, CI, and reporting (all task types)

1. **Every gate must emit artifacts under `reports/`**. Console-only output is insufficient.
2. **Use two scopes deliberately:**
   - `precommit:verify` = changed-files only (`lint-staged`, related tests) for fast feedback.
   - `prepush:verify` + CI = full-repo checks.
3. **Coverage policy is strict by default:** line / branch / function / statement coverage must each be **>= 90%**. Lowering thresholds requires explicit user approval and written rationale.
4. **CI DAST model:** run ZAP and Lighthouse in CI quality jobs. Scope `DAST_TARGET_URL` to the ZAP step only.
5. **Stable report layout:** use `reports/{lint,unit,e2e,a11y,sast,dast,deps,size}/` so humans and CI can find artifacts predictably.
6. **Changed-file requests do not remove full verification.** For feature work, local inner-loop can be changed-file scoped, but pre-push and CI must still run the full suite.
7. **Pages deployment:** if repo uses GitHub Pages, include a deploy job gated on quality and set Vite base path from repo name in CI.

## Common Rationalizations

| Rationalization                                                     | Reality                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "I'll run tests once everything is wired."                          | Miswired scripts fail late. After each phase, run the narrowest check (e.g. `npm run lint` after ESLint).                                                                                                                                                                                                             |
| "Skip oxlint; ESLint is enough."                                    | This stack treats oxlint as a fast gate; dropping it changes the contract - only remove with explicit user approval.                                                                                                                                                                                                  |
| "Axe is flaky; I'll skip it."                                       | Fix env (Chrome path, port) per [reference.md](reference.md). Accessibility is a first-class gate here.                                                                                                                                                                                                               |
| "I'll add Husky last."                                              | Without the hook, contributors skip gates. Install Husky before declaring done.                                                                                                                                                                                                                                       |
| "I'll copy configs from memory."                                    | Use [reference.md](reference.md) to avoid drift and silent omissions.                                                                                                                                                                                                                                                 |
| "While I'm here, I'll refactor the app."                            | Out of scope. Note follow-ups; do not expand the task.                                                                                                                                                                                                                                                                |
| "The old feature code doesn't hurt anything; I'll just leave it."   | Two different cases: **(a)** You _replaced_ a feature - ask the user whether to delete, archive, or route it before declaring done. **(b)** You _added_ a new feature - the existing one is NOT dead code; mount both via navigation. Default assumption when the user says "add X": it is addition, not replacement. |
| "The user said 'create a tree view' - I'll just swap the App root." | "Create" does not mean "replace". Classify as feature-addition and add navigation. Confirm before changing the app render target.                                                                                                                                                                                     |
| "I'll update the docs later."                                       | Later rarely happens, and the docs become a second source of truth that contradicts the code. Update in the same change or open a linked follow-up before merging.                                                                                                                                                    |

## Red Flags

### Tooling / pipeline

- Scripts reference `5173` but the app uses another port - **fix URLs** in Playwright and `check:axe`.
- `check:axe` runs without a working Chrome/ChromeDriver pair on the user's OS - **adjust** `run-axe-check.mjs` or document macOS/Linux paths if you deviate from the reference.
- Duplicate or conflicting `test` / `lint` scripts in `package.json`.
- Pre-commit runs but **skips** tests or checks compared to `precommit:verify` - must match.
- Declaring success without **`npm run precommit:verify`** (or equivalent full pipeline) succeeding.

### Task classification

- Changed what the app root renders without first classifying the task and confirming with the user.
- Deleted, moved, or orphaned existing components / hooks / stores / CSS in response to a "feature addition" request.
- Existing e2e spec silently removed or rewritten instead of kept passing alongside new specs.
- The word "create" in the user's prompt was treated as "replace".

### Design / a11y / docs parity

- Custom ARIA role used without its required composite descendants (e.g. `role="tree"` on a `<ul>` whose items lack `role="treeitem"`, `tablist` without `tab`, `menu` without `menuitem`).
- Nested landmark elements with overlapping purpose (`<aside>` wrapping a single `<nav>`, `<main>` inside `<main>`).
- A single component reading the same state from two sources (props AND store; props AND context) for the same concept.
- `import.meta.glob` used with `{ eager: true }` for a folder that will grow (user content, docs, posts) without noting the trade-off.
- New feature shipped without updating `docs/architecture/ARCHITECTURE.md` when that doc describes a rendering flow that just changed.
- Installing a new dependency without stating the bundle-size impact or running `check:size`.

## Verification

Do not mark the task complete until **all** apply:

### Always

- [ ] `npm run check:all` exits zero (types + format + lint + reports + oxlint + deadcode + SAST + axe + security/vuln + size).
- [ ] `npm run test:all` exits zero (unit + E2E).
- [ ] `npm run precommit:verify` exits zero (project-defined hook verification).
- [ ] Any deviation from default ports, script names, or folder layout is **stated** to the user.

### Bootstrap or tooling-adoption

- [ ] New repo: `git init` done if needed; `npm run prepare` run; `.husky/pre-commit` exists and is executable where relevant.

### Feature or component changes (additional gates)

- [ ] Classification was announced to the user and confirmed (explicitly or implicitly).
- [ ] Existing features still render, still pass their tests, still have their routes / navigation entries.
- [ ] If rendering flow, data source, or entry point changed: `docs/architecture/ARCHITECTURE.md` reflects the new reality.
- [ ] If a new dependency was added: bundle-size delta stated; `npm run check:size` passes.
- [ ] Custom interactive widgets have a documented keyboard plan and ARIA composite roles in place, or use native HTML equivalents.
- [ ] No orphaned files: `npm run check:deadcode` passes (or the agent has flagged intentional exceptions to the user).
- [ ] For component changes, Atomic layer choice is explicit and CSS/tests are co-located.
- [ ] For component/feature styling changes, BEM is followed (`block__element--modifier`).
- [ ] New/updated app code uses TypeScript (`.tsx` / `.ts`) with no new `.jsx` / `.js` files.
- [ ] For removals, route/nav/test/docs references are removed and verified.

## Output Rules

- Prefer **ASCII** in new code unless existing files already use Unicode.
- Prefer **small, composable** components and minimal sample features.
- If any gate fails, **fix and re-run** until green; do not hand off a broken pipeline.

## Quick command reference (mnemonic)

```bash
npm run check:all          # static + a11y + lint/vuln
npm run test:all           # unit + e2e
npm run precommit:verify   # everything the hook runs
```

## Additional Resources

- [examples.md](examples.md) - prompts and expected outcomes.
- [reference.md](reference.md) - full `vite.config`, ESLint, Playwright, axe script, `package.json` scripts, Husky snippet.
- Project component conventions: `docs/conventions/COMPONENT_GUIDE.md`
- Project feature conventions: `docs/conventions/FEATURE_GUIDE.md`
