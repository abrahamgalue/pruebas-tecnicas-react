import { ReactNode, createContext, useReducer } from 'react'
import { Book, BooksActions, BooksState } from '../../types.d'
import { booksInitialState, booksReducer } from './reducer'

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

function useBooksReducer() {
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

  return { books, addToCart, removeFromCart }
}

interface Props {
  children: ReactNode
}

export function BooksProvider({ children }: Props) {
  const { books, addToCart, removeFromCart } = useBooksReducer()

  return (
    <BooksContext.Provider value={books}>
      <BooksDispatchContext.Provider value={{ addToCart, removeFromCart }}>
        {children}
      </BooksDispatchContext.Provider>
    </BooksContext.Provider>
  )
}
