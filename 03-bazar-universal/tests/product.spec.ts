import { test, expect } from '@playwright/test'

test('has product page', async ({ page }) => {
  await page.goto('https://bazar-universal-abrahamgalue.vercel.app/items/8')

  // Images
  const productImgContainer = page.locator('.product_images__Ye_Yw')

  const productImg1 = page.getByRole('img', {
    name: 'Image #0 of Microsoft Surface Laptop',
  })
  const productImg2 = page.getByRole('img', {
    name: 'Image #1 of Microsoft Surface Laptop',
  })
  const productImg3 = page.getByRole('img', {
    name: 'Image #2 of Microsoft Surface Laptop',
  })
  const productImg4 = page.getByRole('img', {
    name: 'Image #3 of Microsoft Surface Laptop',
  })

  const productTitle = page.getByRole('heading', {
    name: 'Microsoft Surface Laptop 4 -',
  })

  // Price and qualification
  await page.getByText('$').click()
  await page.getByText('disponibles').click()
  await page.getByText('$68 disponibles').click()
  await page.getByText('$68 disponibles4.43⭐').click()

  const productDescription = page.getByText('Style and speed. Stand out on')

  const buyBtn = page.getByRole('button', { name: 'Comprar' })

  await expect(productImgContainer).toBeVisible()
  await expect(productImg1).toBeVisible()
  await expect(productImg2).toBeVisible()
  await expect(productImg3).toBeVisible()
  await expect(productImg4).toBeVisible()
  await expect(productTitle).toBeVisible()
  await expect(productDescription).toBeVisible()
  await expect(buyBtn).toBeVisible()
})

test('has product page (empty state)', async ({ page }) => {
  await page.goto('https://bazar-universal-abrahamgalue.vercel.app/items/777')

  const span = page.getByText("There's nothing in here")
  const paragraph = page.getByText('Try searching again!')

  await expect(span).toBeVisible()
  await expect(paragraph).toBeVisible()
})
