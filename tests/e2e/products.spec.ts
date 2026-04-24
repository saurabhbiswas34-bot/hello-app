import { expect, test } from '@playwright/test'

test.describe('Products', () => {
  test('loads product grid from API', async ({ page }) => {
    await page.goto('/products')

    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()

    const grid = page.getByRole('region', { name: 'Product list' })
    await expect(grid).toBeVisible({ timeout: 30_000 })

    const firstCard = grid.getByRole('article').first()
    await expect(firstCard).toBeVisible()
    await expect(firstCard.getByRole('heading', { level: 2 })).toBeVisible()
  })
})
