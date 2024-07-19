import styles from './page.module.css'
import { SearchIcon } from './components/Icons'
import Button from './components/Button'

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
        <Button title='Buscar' form='form' className={styles.btn} />
      </header>
    </main>
  )
}
