import { Library } from '../types'

function BookList({ books }: { books: Library[] }) {
  return (
    <section>
      {books.map(({ book }) => (
        <article>
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
