# React Quality Bootstrap Starter

This repository is a **bootstrap starter for new projects** built with Vite + React + TypeScript and production-style quality gates.

Use this as the base when starting a new UI project that needs:

- Atomic Design folder structure (`atoms` -> `templates`)
- Zustand state + SWR data hook patterns
- Linting, formatting, security checks, dead-code checks, and bundle-size checks
- Unit tests (Vitest) + E2E tests (Playwright)
- Accessibility checks (axe)
- Husky pre-commit and pre-push hooks
- GitHub Actions CI/CD with GitHub Pages deployment

## Quick Start

```bash
npm install
npm run dev
```

## Verification Commands

```bash
npm run check:all
npm run test:all
npm run check:ci
```

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
