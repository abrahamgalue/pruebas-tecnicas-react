import initialBooks from '../mocks/books.json'
import { Book, BookAction, BooksActions, type BooksState } from '../types.d'
import { getLocalStorage, localStorageItems } from '../utils/localStorage'
import { updateBookInCartState } from '../utils/updateCart'

const { BOOKS } = localStorageItems

export const booksInitialState: Book[] =
  getLocalStorage(BOOKS) ||
  initialBooks.library.map(({ book }) => {
    return {
      ...book,
      isInCart: false,
    }
  })

const UPDATE_STATE_BY_ACTION = {
  [BooksActions.ADD]: (state: BooksState, action: BookAction) => {
    return updateBookInCartState(state, action.payload.ISBN, true)
  },
  [BooksActions.REMOVE]: (state: BooksState, action: BookAction) => {
    return updateBookInCartState(state, action.payload.ISBN, false)
  },
}

export const booksReducer = (state: BooksState, action: BookAction) => {
  const { type } = action
  const updateState = UPDATE_STATE_BY_ACTION[type]
  return updateState ? updateState(state, action) : state
}
