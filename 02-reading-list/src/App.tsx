import './App.css'
import BookList from './components/BookList.tsx'
import BooksCart from './components/BooksCart.tsx'
import books from './mocks/books.json'

function App() {
  const newBooks = books.library.map(({ book }) => {
    return {
      ...book,
      isInCart: false,
    }
  })

  return (
    <>
      <header>
        <h1>Lista de libros</h1>
      </header>
      <main>
        <BookList books={newBooks} />
        <BooksCart />
      </main>
    </>
  )
}

export default App
