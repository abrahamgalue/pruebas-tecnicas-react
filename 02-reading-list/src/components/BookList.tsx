import './BookList.css'
import { Book } from '../types'
import { useContext } from 'react'
import { BooksDispatchContext } from '../books/BooksContext'

function BookList({ books }: { books: Book[] }) {
  const { addToCart } = useContext(BooksDispatchContext)

  return (
    <section className='BookListSection'>
      {books.map(book => (
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
  )
}

export default BookList
