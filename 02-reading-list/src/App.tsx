import './App.css'
import { useContext } from 'react'
import { BooksContext } from './context/books.tsx'
import BookList from './components/BookList.tsx'
import BooksCart from './components/BooksCart.tsx'

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
