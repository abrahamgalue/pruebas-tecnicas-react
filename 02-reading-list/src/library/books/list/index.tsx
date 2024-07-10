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
const { BOOK_FILTERS } = localStorageItems

const getBooksCount = (books: Book[]) => {
  const booksInReadingList = [...books].filter(
    book => book.isInCart === true
  ).length
  const booksAvailable = [...books].filter(
    book => book.isInCart !== true
  ).length

  return { booksInReadingList, booksAvailable }
}

interface Props {
  books: Book[]
  categories: string[]
}

function BookList({ books, categories }: Props) {
  const [filterCategory, setFilterCategory] = useState<FiltersCategory>(
    getLocalStorage(BOOK_FILTERS) || {
      genre: DEFAULT_GENRE,
    }
  )
  const [userSearch, setUserSearch] = useState('')
  const { addToCart } = useContext(BooksDispatchContext)
  const bc = useMemo(() => new BroadcastChannel('books_category'), [])
  const { booksInReadingList, booksAvailable } = getBooksCount(books)

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

  const booksByGender = useMemo(() => {
    if (filterCategory.genre === DEFAULT_GENRE) return books

    return [...books].filter(book => book.genre === filterCategory.genre)
  }, [books, filterCategory])

  const genreBooks = booksByGender.length

  const sortedBooks = useMemo(() => {
    if (userSearch === '') return booksByGender
    return [...booksByGender].filter(book =>
      book.title.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())
    )
  }, [booksByGender, userSearch])

  useEffect(() => {
    bc.onmessage = event => {
      setFilterCategory(event.data)
    }

    return () => bc.close()
  }, [bc])

  return (
    <>
      <header>
        <h3 className='BookListTitle'>{booksAvailable} Libros Disponibles</h3>
        {booksInReadingList !== 0 && (
          <p className='BookListCountReadingList'>
            {booksInReadingList} en la Lista de lectura
          </p>
        )}
        <section className='BookListFilter'>
          <div className='BookListFilterGenre'>
            <span>Filtrar por género </span>
            <article>
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
              <span className='BookListFilterInfo'>
                {' '}
                ({genreBooks} disponibles)
              </span>
            </article>
          </div>
          <div className='BookListFilterSearch'>
            <label htmlFor='search'>
              Buscar:{' '}
              <input
                id='search'
                type='text'
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
              />
            </label>
          </div>
        </section>
      </header>

      <section className='BookListSection'>
        {sortedBooks.map(book => (
          <article
            className='BookListArticle'
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
            <div className='BookListInfo'>
              <span className='BookAuthor'>{book.author.name}</span>
              <p className='BookReleaseYear'>{book.year}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default BookList
