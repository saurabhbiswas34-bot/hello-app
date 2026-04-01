import { test, expect } from '@playwright/test'

test('accordion opens and closes an item', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'FAQ Accordion' })).toBeVisible()

  const firstItemButton = page.getByRole('button', {
    name: /what is atomic design\?/i,
  })
  await firstItemButton.click()
  await expect(
    page.getByText(/Atomic Design is a component methodology/i),
  ).toBeVisible()

  await firstItemButton.click()
  await expect(
    page.getByText(/Atomic Design is a component methodology/i),
  ).toBeHidden()
})
