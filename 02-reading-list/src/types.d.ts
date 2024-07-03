export interface Mock {
  library: Library[]
}

export interface Library {
  book: Book
}

export interface Book {
  title: string
  pages: number
  genre: string
  cover: string
  synopsis: string
  year: number
  ISBN: string
  author: Author
  isInCart?: boolean
}

export interface Author {
  name: string
  otherBooks: string[]
}

export type BooksState = Book[]

export enum BooksActions {
  ADD = 'ADD/BOOK',
  REMOVE = 'REMOVE/BOOK',
}

export interface BookAction {
  type: BooksActions
  // esto se debe cambiar
  payload: Book
}
