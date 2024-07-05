import { Book } from '../types'

export const localStorageItems = {
  BOOKS: 'books',
  CART_VISIBILITY: 'cartVisibility',
}

export const updateLocalStorage = (key: string, value: Book[] | boolean) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string)
}
