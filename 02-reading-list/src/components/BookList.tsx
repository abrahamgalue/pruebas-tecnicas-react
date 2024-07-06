import './BookList.css'
import { Book } from '../types'
import { ChangeEvent, useContext, useState } from 'react'
import { BooksDispatchContext } from '../context/books'

function BookList({ books }: { books: Book[] }) {
  const [filterCategory, setFilterCategory] = useState({ genre: 'all' })
  const { addToCart } = useContext(BooksDispatchContext)

  const categories = Array.from(new Set(books.map(book => book.genre)))

  const allBooks = books.length
  const readingListBooks = [...books].filter(
    book => book.isInCart === true
  ).length
  const booksAvailable = [...books].filter(
    book => book.isInCart !== true
  ).length

  const filteredBooks =
    filterCategory.genre !== 'all'
      ? [...books].filter(book => book.genre === filterCategory.genre)
      : books

  const genreBooks = filteredBooks.length

  const toogleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(prevState => ({
      ...prevState,
      genre: e.target.value,
    }))
  }

  return (
    <>
      <header>
        <h2>{allBooks} Libros</h2>
        <h3>{genreBooks} del género</h3>
        <h4>{readingListBooks} en la Lista de lectura</h4>
        <h5>{booksAvailable} Disponibles</h5>
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
          <article
            onClick={() => addToCart(book)}
            key={book.ISBN}
            style={book.isInCart ? { opacity: '.5' } : undefined}
          >
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
