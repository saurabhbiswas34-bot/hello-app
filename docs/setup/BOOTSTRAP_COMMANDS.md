# Bootstrap Commands

Quick copy-paste commands to create a project like this.

## Create app

```bash
npm create vite@latest hello-app -- --template react
cd hello-app
npm install
```

## Runtime dependencies

```bash
npm install swr zustand
```

## Dev dependencies

```bash
npm install -D oxlint @axe-core/cli browser-driver-manager audit-ci eslint-plugin-security
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npm install -D @playwright/test start-server-and-test husky
```

## Browser/tooling setup

```bash
npx playwright install chromium
npx browser-driver-manager install chrome@146
```

## Git + hooks

```bash
git init
npm run prepare
```

## Verify everything

```bash
npm run check:all
npm run test:all
npm run precommit:verify
```
