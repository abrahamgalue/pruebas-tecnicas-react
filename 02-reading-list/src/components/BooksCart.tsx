import { useContext, useState } from 'react'
import { BooksContext, BooksDispatchContext } from '../books/BooksContext'
import './BooksCart.css'
import { CartIcon } from './Icons'

function BooksCart() {
  const [isVisible, setIsVisible] = useState(false)
  const books = useContext(BooksContext)
  const { removeFromCart } = useContext(BooksDispatchContext)

  const newBooks = books.filter(books => books.isInCart !== false)

  const toggleCartVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <>
      <button className='CartBtn' onClick={toggleCartVisibility}>
        <CartIcon />
      </button>
      {isVisible && (
        <div className='BooksCart'>
          <h2>Lista de lectura</h2>
          <section className='BooksCartSection'>
            {newBooks.length !== 0 &&
              newBooks.map(book => (
                <article key={book.ISBN} onClick={() => removeFromCart(book)}>
                  <img
                    src={book.cover}
                    alt={`Book ${book.title}`}
                    width={100}
                    height={150}
                  />
                  <div>
                    <span>{book.author.name}</span>
                    <p>{book.year}</p>
                  </div>
                </article>
              ))}
          </section>
        </div>
      )}
    </>
  )
}

export default BooksCart
