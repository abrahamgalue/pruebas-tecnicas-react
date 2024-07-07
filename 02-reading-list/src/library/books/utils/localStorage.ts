import { Book, FiltersCategory } from '../../../types'

export const localStorageItems = {
  BOOKS: 'books',
  CART_VISIBILITY: 'cart_visibility',
  BOOK_FILTERS: 'book_filters',
}

export const updateLocalStorage = (
  key: string,
  value: Book[] | boolean | FiltersCategory
) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string)
}
