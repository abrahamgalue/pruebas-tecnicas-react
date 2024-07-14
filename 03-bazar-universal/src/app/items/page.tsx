import Link from 'next/link'
import api from '../api'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  const data = await api.item.search(searchParams.search)
  const { products } = data

  return (
    <>
      <header>
        <form action='/items'>
          <input type='text' name='search' />
          <button>Buscar</button>
        </form>
      </header>
      <main>
        <section>
          <article>
            {products.map(item => (
              <div key={item.id}>
                <Link href={`/items/${item.id}`} key={item.id}>
                  <picture>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      width={160}
                      height={160}
                    />
                  </picture>
                  <div>
                    <p>{item.title}</p>
                  </div>
                </Link>
              </div>
            ))}
          </article>
        </section>
      </main>
    </>
  )
}
