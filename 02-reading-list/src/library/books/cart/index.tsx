import './BooksCart.css'
import { BooksContext, BooksDispatchContext } from '../context'
import { useContext, useEffect, useMemo, useState } from 'react'
import {
  getLocalStorage,
  localStorageItems,
  updateLocalStorage,
} from '../utils/localStorage'
import { CartIcon } from './icons'

function BooksCart() {
  const books = useContext(BooksContext)
  const { removeFromCart } = useContext(BooksDispatchContext)
  const { CART_VISIBILITY } = localStorageItems
  const [isVisible, setIsVisible] = useState<boolean>(
    getLocalStorage(CART_VISIBILITY) || false
  )
  const bc = useMemo(() => new BroadcastChannel('cart_visibility'), [])

  const cartBooks = books.filter(books => books.isInCart !== false)

  const toggleCartVisibility = () => {
    setIsVisible(prevState => {
      updateLocalStorage(CART_VISIBILITY, !prevState)
      return !prevState
    })
    bc.postMessage(!isVisible)
  }

  useEffect(() => {
    bc.onmessage = event => {
      setIsVisible(event.data)
    }

    return () => bc.close()
  }, [bc])

  return (
    <aside>
      <button className='CartBtn' onClick={toggleCartVisibility}>
        <CartIcon />
      </button>
      {isVisible && (
        <article className='BooksCart'>
          <h2>Lista de lectura</h2>
          <section className='BooksCartSection'>
            {cartBooks.length !== 0 &&
              cartBooks.map(book => (
                <article
                  className='BooksCartArticle'
                  key={book.ISBN}
                  onClick={() => removeFromCart(book)}
                >
                  <h3 className='BooksCartTitle'>{book.title}</h3>
                  <img
                    src={book.cover}
                    alt={`Reading list book ${book.title}`}
                  />
                </article>
              ))}
          </section>
        </article>
      )}
    </aside>
  )
}

export default BooksCart
