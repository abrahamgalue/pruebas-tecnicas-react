import { useContext } from 'react'
import { BooksContext } from './books/BooksContext.tsx'
import './App.css'

function App() {
  const books = useContext(BooksContext)

  console.log(
    books.library.map(({ book }) => {
      return book.pages
    })
  )

  return (
    <>
      <h1>Hola Mundo</h1>
    </>
  )
}

export default App
