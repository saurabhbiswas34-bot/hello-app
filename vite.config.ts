import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react()],
  test: {
    reporters: ['default', 'junit', 'json', 'html'],
    outputFile: {
      junit: './reports/unit/junit.xml',
      json: './reports/unit/results.json',
      html: './reports/unit/html/index.html',
    },
    coverage: {
      provider: 'v8',
      enabled: process.env.VITEST_COVERAGE === 'true',
      reportsDirectory: './reports/unit/coverage',
      reporter: ['text', 'html', 'json-summary', 'lcov'],
      exclude: [
        'src/main.tsx',
        'src/test/**',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.stories.{ts,tsx}',
      ],
      thresholds: {
        'src/components/atoms/Button/Button.tsx': {
          lines: 90,
          branches: 90,
          functions: 90,
          statements: 90,
        },
        'src/components/atoms/Image/Image.tsx': {
          lines: 90,
          branches: 90,
          functions: 90,
          statements: 90,
        },
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          environment: 'jsdom',
          setupFiles: './src/test/setupTests.ts',
          globals: true,
          pool: 'threads',
          maxWorkers: 2,
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
        },
      },
    ],
  },
})
