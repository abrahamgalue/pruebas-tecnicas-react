import { localStorageItems, updateLocalStorage } from './localStorage'
import { BooksState } from '../../../types'

const { BOOKS } = localStorageItems

export const updateBookInCartState = (
  state: BooksState,
  ISBN: string,
  isInCart: boolean
) => {
  const bookIndex = state.findIndex(book => book.ISBN === ISBN)

  if (bookIndex >= 0) {
    const newState = [
      ...state.slice(0, bookIndex),
      { ...state[bookIndex], isInCart },
      ...state.slice(bookIndex + 1),
    ]

    updateLocalStorage(BOOKS, newState)
    return newState
  }

  updateLocalStorage(BOOKS, state)
  return state
}
