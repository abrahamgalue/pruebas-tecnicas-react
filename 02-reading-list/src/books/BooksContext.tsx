import { ReactNode, createContext, useReducer } from 'react'
import initialBooks from '../mocks/books.json'
import { Mock } from '../types'

export const BooksContext = createContext(initialBooks)
export const BooksDispatchContext = createContext({})

interface Props {
  children: ReactNode
}

export function BooksProvider({ children }: Props) {
  const [books, dispatch] = useReducer(booksReducer, initialBooks)

  return (
    <BooksContext.Provider value={books}>
      <BooksDispatchContext.Provider value={dispatch}>
        {children}
      </BooksDispatchContext.Provider>
    </BooksContext.Provider>
  )
}

type BooksState = Mock

enum BooksActions {
  ADD = 'ADD/BOOK',
}

interface BookAction {
  type: BooksActions
  // esto se debe cambiar
  payload: Mock
}

function booksReducer(state: BooksState, action: BookAction) {
  switch (action.type) {
    case BooksActions.ADD: {
      return state
    }
  }

  return state
}
