import { test, expect } from '@playwright/test'

test('search products', async ({ page }) => {
  await page.goto('https://bazar-universal-abrahamgalue.vercel.app/')

  await page.getByPlaceholder('laptops, smartphones,').fill('laptop')
  await page.getByRole('button', { name: 'Buscar' }).click()
  await page.getByPlaceholder('laptops, smartphones,').click()
  await page
    .getByRole('heading', { name: 'Resultados de búsqueda de "' })
    .click()
  await page.getByText('laptops -').click()
  await page.getByRole('link', { name: 'Microsoft Surface Laptop 4' }).click()
})

test('search products (empty state)', async ({ page }) => {
  await page.goto('https://bazar-universal-abrahamgalue.vercel.app/')

  await page.getByRole('button', { name: 'Buscar' }).click()

  const span = page.getByText("There's nothing in here")
  const paragraph = page.getByText('Try searching again!')

  await expect(span).toBeVisible()
  await expect(paragraph).toBeVisible()
})
