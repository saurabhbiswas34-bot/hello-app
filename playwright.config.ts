import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  reporter: [
    ['list'],
    ['junit', { outputFile: 'reports/e2e/junit.xml' }],
    ['html', { outputFolder: 'reports/e2e/html', open: 'never' }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  webServer: {
    command: 'npm run dev -- --host localhost --port 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 120000,
  },
})
