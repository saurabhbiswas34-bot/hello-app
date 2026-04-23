import { test, expect } from '@playwright/test'

test('docs explorer shows tree and switches content on selection', async ({
  page,
}) => {
  await page.goto('/')

  const sidebar = page.getByRole('navigation', { name: /documentation tree/i })
  await expect(sidebar).toBeVisible()

  await sidebar.getByRole('button', { name: 'ARCHITECTURE.md' }).click()
  await expect(
    page.getByRole('heading', { level: 1, name: /architecture/i }).first()
  ).toBeVisible()

  await sidebar.getByRole('button', { name: 'QUALITY_GATES.md' }).click()
  await expect(
    page.getByRole('heading', { level: 1, name: /quality gates/i })
  ).toBeVisible()
})

test('primary navigation switches between features', async ({ page }) => {
  await page.goto('/')

  const nav = page.getByRole('navigation', { name: /primary/i })
  await nav.getByRole('link', { name: /faq accordion/i }).click()
  await expect(
    page.getByRole('heading', { name: 'FAQ Accordion' })
  ).toBeVisible()

  await nav.getByRole('link', { name: /docs explorer/i }).click()
  await expect(
    page.getByRole('navigation', { name: /documentation tree/i })
  ).toBeVisible()
})
