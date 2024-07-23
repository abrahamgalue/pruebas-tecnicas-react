import { test, expect } from '@playwright/test'

test('has 404 page', async ({ page }) => {
  await page.goto('https://bazar-universal-abrahamgalue.vercel.app/objetos')

  const title = page.getByRole('heading', { name: 'Not Found' })
  const description = page.getByText('Could not find requested')
  const redirectBtn = page.getByRole('link', { name: 'Return Home' })

  await expect(title).toBeVisible()
  await expect(description).toBeVisible()
  await expect(redirectBtn).toBeVisible()
})

test('404 page redirect to main page', async ({ page }) => {
  await page.goto('https://bazar-universal-abrahamgalue.vercel.app/objetos')
  await page.getByRole('link', { name: 'Return Home' }).click()

  await expect(page).toHaveURL(
    'https://bazar-universal-abrahamgalue.vercel.app/'
  )
})
