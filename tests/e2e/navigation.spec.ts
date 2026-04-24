import { expect, test } from '@playwright/test'

test.describe('Primary navigation', () => {
  test('moves between Home, Users, and Products', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', {
        name: 'React Quality Bootstrap Starter',
      })
    ).toBeVisible()

    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Users' })
      .click()
    await expect(page).toHaveURL(/\/users$/)
    await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible()

    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Products' })
      .click()
    await expect(page).toHaveURL(/\/products$/)
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()

    await page
      .getByRole('navigation', { name: 'Primary' })
      .getByRole('link', { name: 'Home' })
      .click()
    await expect(page).toHaveURL(/\/$/)
    await expect(
      page.getByRole('heading', {
        name: 'React Quality Bootstrap Starter',
      })
    ).toBeVisible()
  })
})
