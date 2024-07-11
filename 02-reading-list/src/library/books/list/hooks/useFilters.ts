import { useState } from 'react'
import { FiltersCategory } from '../../../../types'
import {
  getLocalStorage,
  localStorageItems,
  updateLocalStorage,
} from '../../utils/localStorage'

export const DEFAULT_GENRE = 'all'
export const { BOOK_FILTERS } = localStorageItems

function useFilters() {
  const [filterCategory, setFilterCategory] = useState<FiltersCategory>(
    getLocalStorage(BOOK_FILTERS) || {
      search: '',
      genre: DEFAULT_GENRE,
      minPages: 43,
    }
  )
  const bc = new BroadcastChannel('books_category')

  const toogleFilters = (type: keyof FiltersCategory, value: string) => {
    setFilterCategory(prevState => {
      const newState = {
        ...prevState,
        [type]: value,
      }

      updateLocalStorage(BOOK_FILTERS, newState)

      return newState
    })
    bc.postMessage({
      ...filterCategory,
      [type]: value,
    })
  }

  const setBCData = (data: FiltersCategory) => {
    setFilterCategory(data)
  }

  return { bc, filterCategory, toogleFilters, setBCData }
}

export default useFilters
