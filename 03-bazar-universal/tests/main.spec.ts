import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://bazar-universal-abrahamgalue.vercel.app/')

  const title = page.getByRole('heading', { name: 'Bazar Online' })

  await expect(title).toBeVisible()
})

test('has products input', async ({ page }) => {
  await page.goto('https://bazar-universal-abrahamgalue.vercel.app/')

  const userInput = page.getByPlaceholder('laptops, smartphones,')

  await expect(userInput).toBeVisible()
})

test('has search button', async ({ page }) => {
  await page.goto('https://bazar-universal-abrahamgalue.vercel.app/')

  const searchBtn = page.getByRole('button', { name: 'Buscar' })

  await expect(searchBtn).toBeVisible()
})
