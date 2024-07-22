import api from '@/app/lib/api'
import styles from './product.module.css'
import Link from 'next/link'
import Button from '@/app/components/Button'
import EmptyState from '@/app/components/EmtyState'

export default async function Products({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await api.item.fetch(id)

  if (product.status === 404) {
    return <EmptyState />
  }

  return (
    <div>
      <div className={styles.images}>
        <figure className={styles.mainPictureFigure}>
          {product.images.map((image: string, index: number) => {
            if (index === 0) {
              return (
                <picture key={index}>
                  <img
                    className={styles.mainImage}
                    src={image}
                    alt={`Image #${index} of ${product.title}`}
                  />
                </picture>
              )
            }
          })}
        </figure>

        {product.images.length > 1 && (
          <div className={styles.imagesContained}>
            {product.images.map((image: string, index: number) => {
              if (index === 0) return
              if (index >= 4) return

              return (
                <figure key={index}>
                  <picture>
                    <img
                      src={image}
                      alt={`Image #${index} of ${product.title}`}
                      width={200}
                      height={150}
                    />
                  </picture>
                </figure>
              )
            })}
          </div>
        )}
      </div>
      <div className={styles.information}>
        <h2 className={styles.title}>
          {product.title} - {product.brand}
        </h2>
        <div className={styles.details}>
          <div className={styles.priceAndStock}>
            <span className={styles.price}>{product.price}$</span>
            <p className={styles.stock}>{product.stock} disponibles</p>
          </div>
          {product.rating}⭐
        </div>
        <p className={styles.description}>{product.description}</p>
      </div>
      <Link href='/' className={styles.link}>
        <Button title='Comprar' className={styles.btn} />
      </Link>
    </div>
  )
}
