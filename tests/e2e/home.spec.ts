import { expect, test } from '@playwright/test'

test.describe('Home', () => {
  test('shows hero and included demos copy', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Hello App' })).toBeVisible()
    await expect(
      page.getByRole('heading', {
        name: 'React Quality Bootstrap Starter',
      })
    ).toBeVisible()

    await expect(
      page.getByText(/Atomic Design, feature slicing/i)
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Included demos' })
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Storybook docs \(new tab\)/i })
    ).toHaveAttribute('href', 'https://storybook.js.org/')
  })
})
