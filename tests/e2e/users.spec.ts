import { expect, test } from '@playwright/test'

test.describe('Users', () => {
  test('loads accordion from API and expands a panel', async ({ page }) => {
    await page.goto('/users')

    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()

    const accordion = page.getByRole('region', { name: 'Users accordion' })
    await expect(accordion).toBeVisible({ timeout: 30_000 })

    const firstTrigger = accordion.getByRole('button').first()
    await expect(firstTrigger).toBeVisible()
    const title = await firstTrigger.textContent()
    expect(title).toBeTruthy()

    await firstTrigger.click()
    await expect(accordion.locator('.accordion__content').first()).toBeVisible()
    await expect(
      accordion.locator('.accordion__content').first()
    ).toContainText(/Email:/i)
  })
})
