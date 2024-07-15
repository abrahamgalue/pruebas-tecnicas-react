import Link from 'next/link'
import api from '../api'
import styles from './page.module.css'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  const data = await api.item.search(searchParams.search)
  const { products, total, categories } = data

  return (
    <section className={styles.section}>
      <h2>
        Resultados de búsqueda de &quot;{searchParams.search}&quot;: {total}
      </h2>
      <article className={styles.categories}>
        {categories?.map(category => (
          <p key={category.name} className={styles[category.name]}>
            {category.name} - {category.quantity}
          </p>
        ))}
      </article>
      {products.map(item => (
        <article key={item.id} className={styles.article}>
          <Link href={`/items/${item.id}`} className={styles.container}>
            <picture>
              <img
                src={item.thumbnail}
                alt={item.title}
                width={160}
                height={160}
              />
            </picture>
            <div className={styles.information}>
              <h3>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <div className={styles.priceAndRating}>
                <span className={styles.price}>{item.price}$</span>
                {item.rating}⭐
              </div>
            </div>
          </Link>
        </article>
      ))}
    </section>
  )
}
