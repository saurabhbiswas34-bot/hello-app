# React Quality Bootstrap Starter

This repository is a **bootstrap starter for new projects** built with Vite + React + TypeScript and production-style quality gates.

Use this as the base when starting a new UI project that needs:

- Atomic Design folder structure (`atoms` -> `molecules` -> `organisms`) plus feature pages in `src/features`
- React `useReducer` state + SWR data hook patterns
- Linting, formatting, security checks, dead-code checks, and bundle-size checks
- Unit tests (Vitest) + E2E tests (Playwright)
- Accessibility checks (axe)
- Storybook for component stories (same repo as the app; see **Storybook** below)
- BEM CSS architecture for all component/feature styling
- TypeScript-only React code (`.tsx` / `.ts`)
- Husky pre-commit and pre-push hooks
- GitHub Actions CI/CD with GitHub Pages deployment

Current route demos:

- `/` Home
- `/users` Users accordion list
- `/products` Product card grid

## Quick Start

```bash
npm install
npm run dev
```

## Storybook

Component stories live in this **same repository** under `src/**/*.stories.*`, with config in `.storybook/`. There is no separate Storybook-only repo or `storybook-mcp` package; Vite and Storybook both use this project root.

```bash
npm run storybook      # dev server (default http://localhost:6006)
npm run build-storybook # static output to storybook-static/
```

## Verification Commands

```bash
npm run check:all
npm run test:all
npm run check:ci
```

## Environment

API base URL is configurable:

```bash
VITE_API_BASE_URL=https://dummyjson.com
```

If not provided, the app defaults to `https://dummyjson.com`.

## Reports

Quality and test artifacts are generated under:

- `reports/lint`
- `reports/unit`
- `reports/e2e`
- `reports/a11y`
- `reports/sast`
- `reports/dast`
- `reports/deps`
- `reports/size`

## CI/CD

Workflow: `.github/workflows/ci-cd.yml`

- Runs quality + tests + DAST on pull requests and pushes
- Deploys to GitHub Pages after successful quality checks on `main` or `master`

## Starter Guidance

For reusable bootstrap guidance and reference configs:

- Skill process guide: `.cursor/skills/react-quality-starter/SKILL.md`
- Copy-paste reference: `.cursor/skills/react-quality-starter/reference.md`
- Project setup docs: `docs/setup/CONTEXT_SETUP.md`
- Component conventions: `docs/conventions/COMPONENT_GUIDE.md`
- Feature conventions: `docs/conventions/FEATURE_GUIDE.md`
