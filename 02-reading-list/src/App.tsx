import { useContext } from 'react'
import { BooksContext } from './books/BooksContext.tsx'
import './App.css'
import BookList from './components/BookList.tsx'

function App() {
  const { library } = useContext(BooksContext)

  return (
    <>
      <header>
        <h1>Lista de libros</h1>
      </header>
      <main>
        <BookList books={library} />
      </main>
    </>
  )
}

export default App
