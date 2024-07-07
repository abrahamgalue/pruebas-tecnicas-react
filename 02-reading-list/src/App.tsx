import './App.css'
import { useContext } from 'react'
import { BooksContext } from './library/books/context'
import BookList from './library/books/list'
import BooksCart from './library/books/cart'

function App() {
  const books = useContext(BooksContext)

  return (
    <>
      <header>
        <h1>Lista de libros</h1>
      </header>
      <main>
        <BookList books={books} />
        <BooksCart />
      </main>
    </>
  )
}

export default App
