import './BookList.css'
import { Book, FiltersCategory } from '../../../types'
import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import { BooksDispatchContext } from '../context'
import {
  getLocalStorage,
  localStorageItems,
  updateLocalStorage,
} from '../utils/localStorage'

const DEFAULT_GENRE = 'all'

function BookList({ books }: { books: Book[] }) {
  const { BOOK_FILTERS } = localStorageItems
  const [filterCategory, setFilterCategory] = useState<FiltersCategory>(
    getLocalStorage(BOOK_FILTERS) || {
      genre: DEFAULT_GENRE,
    }
  )
  const { addToCart } = useContext(BooksDispatchContext)
  const bc = useMemo(() => new BroadcastChannel('books_category'), [])

  const categories = Array.from(new Set(books.map(book => book.genre)))

  const allBooks = books.length
  const readingListBooks = [...books].filter(
    book => book.isInCart === true
  ).length
  const booksAvailable = [...books].filter(
    book => book.isInCart !== true
  ).length

  const filteredBooks =
    filterCategory.genre !== DEFAULT_GENRE
      ? [...books].filter(book => book.genre === filterCategory.genre)
      : books

  const genreBooks = filteredBooks.length

  const toogleCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(prevState => {
      const newState = {
        ...prevState,
        genre: e.target.value,
      }

      updateLocalStorage(BOOK_FILTERS, newState)

      return newState
    })
    bc.postMessage({
      ...filterCategory,
      genre: e.target.value,
    })
  }

  useEffect(() => {
    bc.onmessage = event => {
      setFilterCategory(event.data)
    }

    return () => bc.close()
  }, [bc])

  return (
    <>
      <header>
        <p>{allBooks} Libros</p>
        <p>{genreBooks} del género</p>
        <p>{readingListBooks} en la Lista de lectura</p>
        <p>{booksAvailable} Disponibles</p>
        <span>Categorias: </span>
        <select
          value={filterCategory.genre}
          onChange={toogleCategory}
          name='categories'
          id='categories'
        >
          <option value={DEFAULT_GENRE}>Todas</option>
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
