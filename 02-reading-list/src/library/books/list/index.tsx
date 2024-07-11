import './BookList.css'
import { Book, FiltersActions } from '../../../types.d'
import { useContext, useEffect, useMemo } from 'react'
import { BooksDispatchContext } from '../context'
import useFilters, { DEFAULT_GENRE } from './hooks/useFilters'

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
  countPages: {
    minCountPages: number
    maxCountPages: number
  }
}

function BookList({ books, categories, countPages }: Props) {
  const { bc, filterCategory, toogleFilters, setBCData } = useFilters()
  const { addToCart } = useContext(BooksDispatchContext)
  const { booksInReadingList, booksAvailable } = getBooksCount(books)
  const { minCountPages, maxCountPages } = countPages

  const booksByPages = useMemo(() => {
    if (filterCategory.minPages === 43) return books

    return [...books].filter(book => book.pages >= filterCategory.minPages)
  }, [books, filterCategory.minPages])

  const booksByGender = useMemo(() => {
    if (filterCategory.genre === DEFAULT_GENRE) return booksByPages

    return [...booksByPages].filter(book => book.genre === filterCategory.genre)
  }, [booksByPages, filterCategory])

  const sortedBooks = useMemo(() => {
    if (filterCategory.search === '') return booksByGender
    return [...booksByGender].filter(book =>
      book.title
        .toLocaleLowerCase()
        .includes(filterCategory.search.toLocaleLowerCase())
    )
  }, [booksByGender, filterCategory.search])

  const genreBooks = sortedBooks.length

  useEffect(() => {
    bc.onmessage = event => {
      setBCData(event.data)
    }

    return () => bc.close()
  }, [bc, setBCData])

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
                onChange={e =>
                  toogleFilters(FiltersActions.genre, e.target.value)
                }
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
          <div className='BookListFilterCountPages'>
            <label htmlFor='pagesCount'>
              Número de páginas: {filterCategory.minPages}
              <br />
              <input
                type='range'
                name='pagesCount'
                id='pagesCount'
                min={minCountPages}
                max={maxCountPages}
                value={filterCategory.minPages}
                onChange={e =>
                  toogleFilters(FiltersActions.minPages, e.target.value)
                }
              />
            </label>
          </div>
          <div className='BookListFilterSearch'>
            <label htmlFor='search'>
              Buscar:{' '}
              <input
                id='search'
                type='text'
                value={filterCategory.search}
                onChange={e =>
                  toogleFilters(FiltersActions.search, e.target.value)
                }
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
