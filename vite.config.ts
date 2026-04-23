import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react()],
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    globals: true,
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
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/test/**', 'src/**/*.test.{ts,tsx}'],
      thresholds: {
        lines: 90,
        branches: 90,
        functions: 90,
        statements: 90,
      },
    },
  },
})
