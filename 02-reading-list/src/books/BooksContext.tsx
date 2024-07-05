import { ReactNode, createContext, useReducer } from 'react'
import initialBooks from '../mocks/books.json'
import { Book, BookAction, BooksActions, type BooksState } from '../types.d'
import {
  getLocalStorage,
  localStorageItems,
  updateLocalStorage,
} from '../utils/localStorage'

const { BOOKS } = localStorageItems

const updateBookInCartState = (
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

const booksInitialState: Book[] =
  getLocalStorage(BOOKS) ||
  initialBooks.library.map(({ book }) => {
    return {
      ...book,
      isInCart: false,
    }
  })

export const BooksContext = createContext<BooksState>(booksInitialState)
export const BooksDispatchContext = createContext({
  addToCart: (book: Book) => {
    BooksActions
    book
  },
  removeFromCart: (book: Book) => {
    BooksActions
    book
  },
})

interface Props {
  children: ReactNode
}

export function BooksProvider({ children }: Props) {
  const [books, dispatch] = useReducer(booksReducer, booksInitialState)

  const addToCart = (book: Book) =>
    dispatch({
      type: BooksActions.ADD,
      payload: book,
    })

  const removeFromCart = (book: Book) =>
    dispatch({
      type: BooksActions.REMOVE,
      payload: book,
    })

  return (
    <BooksContext.Provider value={books}>
      <BooksDispatchContext.Provider value={{ addToCart, removeFromCart }}>
        {children}
      </BooksDispatchContext.Provider>
    </BooksContext.Provider>
  )
}

const UPDATE_STATE_BY_ACTION = {
  [BooksActions.ADD]: (state: BooksState, action: BookAction) => {
    return updateBookInCartState(state, action.payload.ISBN, true)
  },
  [BooksActions.REMOVE]: (state: BooksState, action: BookAction) => {
    return updateBookInCartState(state, action.payload.ISBN, false)
  },
}

function booksReducer(state: BooksState, action: BookAction) {
  const { type } = action
  const updateState = UPDATE_STATE_BY_ACTION[type]
  return updateState ? updateState(state, action) : state
}
