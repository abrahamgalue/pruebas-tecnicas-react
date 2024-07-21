import styles from './empty-state.module.css'
import { SearchNotFound } from './Icons'

export default function EmptyState() {
  return (
    <main className={styles.main}>
      <span className={styles.title}>There&apos;s nothing in here</span>
      <SearchNotFound />
      <p>Try searching again!</p>
    </main>
  )
}
