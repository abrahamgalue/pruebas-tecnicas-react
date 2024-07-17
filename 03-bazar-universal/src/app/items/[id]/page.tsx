import api from '@/app/api'
import styles from './product.module.css'
import Link from 'next/link'
import Button from '@/app/components/Button'

export async function generateStaticParams() {
  return [
    {
      id: '1',
    },
    {
      id: '2',
    },
    {
      id: '3',
    },
    {
      id: '4',
    },
    {
      id: '5',
    },
    {
      id: '6',
    },
    {
      id: '7',
    },
    {
      id: '8',
    },
    {
      id: '9',
    },
    {
      id: '10',
    },
    {
      id: '11',
    },
    {
      id: '12',
    },
    {
      id: '13',
    },
    {
      id: '14',
    },
    {
      id: '15',
    },
    {
      id: '16',
    },
    {
      id: '17',
    },
    {
      id: '18',
    },
    {
      id: '19',
    },
    {
      id: '20',
    },
    {
      id: '21',
    },
    {
      id: '22',
    },
    {
      id: '23',
    },
    {
      id: '24',
    },
    {
      id: '25',
    },
    {
      id: '26',
    },
    {
      id: '27',
    },
    {
      id: '28',
    },
    {
      id: '29',
    },
    {
      id: '30',
    },
  ]
}

export default async function Products({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await api.item.fetch(id)

  return (
    <div>
      <div className={styles.images}>
        <figure className={styles.mainPictureFigure}>
          {product.images.map((image, index) => {
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
            {product.images.map((image, index) => {
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
      <Link href='/'>
        <Button title='Comprar' className={styles.btn} />
      </Link>
    </div>
  )
}
