import { expect, test } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://reading-list-abrahamgalue.netlify.app/')

  const title = page.getByRole('heading', { name: 'Lista de libros' })

  await expect(title).toBeVisible()
})

test('has books information', async ({ page }) => {
  await page.goto('https://reading-list-abrahamgalue.netlify.app/')

  const allBooks = page.getByText('13 Libros')
  const genreBooks = page.getByText('del género')
  const readingListBooks = page.getByText('en la Lista de lectura')
  const booksAvailable = page.getByText('Disponibles')

  await expect(allBooks).toBeVisible()
  await expect(genreBooks).toBeVisible()
  await expect(readingListBooks).toBeVisible()
  await expect(booksAvailable).toBeVisible()
})

test('has categories', async ({ page }) => {
  await page.goto('https://reading-list-abrahamgalue.netlify.app/')

  const categories = page.getByText('Categorias:')
  const selectCategories = await page
    .getByRole('combobox')
    .selectOption('Ciencia ficción')

  await expect(categories).toBeVisible()
  expect(selectCategories).toBeTruthy()
})

test('has list of books', async ({ page }) => {
  await page.goto('https://reading-list-abrahamgalue.netlify.app/')

  const image = page.getByRole('img', { name: 'Book Dune' })
  const author = page.getByText('Frank Herbert')
  const releaseYear = page.getByText('1965')

  const imageSrc = await image.getAttribute('src')

  expect(imageSrc).toBe(
    'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1555447414i/44767458.jpg'
  )
  await expect(author).toBeVisible()
  await expect(releaseYear).toBeVisible()
})

test('has reading list', async ({ page }) => {
  await page.goto('https://reading-list-abrahamgalue.netlify.app/')

  const cartBtn = page.getByRole('button')

  await cartBtn.click()

  const cartTitle = page.getByRole('heading', {
    name: 'Lista de lectura',
    exact: true,
  })

  const bookInList = page.getByRole('img', { name: 'Book Juego de Tronos' })

  await bookInList.click()

  const bookInCart = page
    .locator('section')
    .filter({ hasText: /^George R\. R\. Martin1996$/ })
    .getByRole('article')

  await expect(cartTitle).toBeVisible()
  await expect(bookInCart).toBeVisible()

  await cartBtn.click()

  await expect(cartBtn).toBeVisible()
})
