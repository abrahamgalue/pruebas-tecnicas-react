import styles from './layout.module.css'
import { SearchIcon } from '../components/Icons'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <header className={styles.header}>
        <form action='/items' className={styles.form}>
          <input
            type='text'
            name='search'
            className={styles.input}
            placeholder='laptops, smartphones, ...'
            autoComplete='off'
          />
          <button className={styles.iconBtn}>
            <SearchIcon />
          </button>
        </form>
      </header>
      {children}
    </main>
  )
}
