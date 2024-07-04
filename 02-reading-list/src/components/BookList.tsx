import './BookList.css'
import { Book } from '../types'
import { ChangeEvent, useContext, useState } from 'react'
import { BooksDispatchContext } from '../books/BooksContext'

function BookList({ books }: { books: Book[] }) {
  const [filterCategory, setFilterCategory] = useState('all')
  const { addToCart } = useContext(BooksDispatchContext)

  const toogleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value)
  }

  const categories = Array.from(new Set(books.map(book => book.genre)))

  const allBooks = books.length
  const readingListBooks = [...books].filter(
    book => book.isInCart === true
  ).length

  const filteredBooks =
    filterCategory !== 'all'
      ? [...books].filter(book => book.genre === filterCategory)
      : books

  const availableBooks = filteredBooks.length

  return (
    <>
      <header>
        <h2>Libros: {allBooks}</h2>
        <h2>Libros por genero: {availableBooks}</h2>
        <h2>En la lista de lectura: {readingListBooks}</h2>
        <span>Categorias: </span>
        <select onChange={toogleCategory} name='categories' id='categories'>
          <option value='all'>Todas</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </header>
      <section className='BookListSection'>
        {filteredBooks.map(book => (
          <article onClick={() => addToCart(book)} key={book.ISBN}>
            <img
              src={book.cover}
              alt={`Book ${book.title}`}
              width={300}
              height={450}
            />
            <div>
              <span>{book.author.name}</span>
              <p>{book.year}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default BookList
