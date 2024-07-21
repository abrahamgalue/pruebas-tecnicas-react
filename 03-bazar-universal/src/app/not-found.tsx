import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>Not Found</h2>
      <p className={styles.info}>Could not find requested resource</p>
      <Link href='/' className={styles.btn}>
        Return Home
      </Link>
    </main>
  )
}
