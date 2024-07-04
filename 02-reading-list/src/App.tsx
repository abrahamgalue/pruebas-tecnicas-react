import { useContext } from 'react'
import './App.css'
import BookList from './components/BookList.tsx'
import BooksCart from './components/BooksCart.tsx'
import { BooksContext } from './books/BooksContext.tsx'

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
