import { expect, test } from '@playwright/test'

test.describe('Routing', () => {
  test('unknown paths redirect to home', async ({ page }) => {
    await page.goto('/this-route-does-not-exist')

    await expect(page).toHaveURL(/\/$/)
    await expect(
      page.getByRole('heading', {
        name: 'React Quality Bootstrap Starter',
      })
    ).toBeVisible()
  })
})
