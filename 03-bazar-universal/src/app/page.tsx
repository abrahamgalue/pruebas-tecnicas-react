import { SearchIcon } from './components/Icons'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1>Bazar Online</h1>
        <form action='/items' id='form' className={styles.form}>
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
        <button form='form' className={styles.btn}>
          Buscar
        </button>
      </header>
    </main>
  )
}
