import './App.css'
import { useContext } from 'react'
import { BooksContext } from './library/books/context'
import BookList from './library/books/list'
import BooksCart from './library/books/cart'

function App() {
  const books = useContext(BooksContext)
  const categories = Array.from(new Set(books.map(book => book.genre)))
  const minCountPages = Math.min(...[...books].map(book => book.pages))
  const maxCountPages = Math.max(...[...books].map(book => book.pages))

  return (
    <>
      <header>
        <h1>Lista de libros</h1>
      </header>
      <main>
        <BookList
          books={books}
          categories={categories}
          countPages={{ minCountPages, maxCountPages }}
        />
        <BooksCart />
      </main>
    </>
  )
}

export default App
