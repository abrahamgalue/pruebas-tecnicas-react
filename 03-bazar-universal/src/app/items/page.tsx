import api from '@/app/lib/api'
import styles from './page.module.css'
import { Product, ProductCategories } from '../../../types'
import Link from 'next/link'
import EmptyState from '../components/EmtyState'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search: string }
}) {
  const data = await api.item.search(searchParams.search)
  const { products, total, categories, status } = data

  if (status === 404) {
    return <EmptyState />
  }

  return (
    <section className={styles.section}>
      <h2>
        Resultados de búsqueda de &quot;{searchParams.search}&quot;: {total}
      </h2>
      <article className={styles.categories}>
        {categories?.map((category: ProductCategories) => (
          <p key={category.name} className={styles[category.name]}>
            {category.name} - {category.quantity}
          </p>
        ))}
      </article>
      {products.map((item: Product) => (
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
