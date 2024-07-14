import { Mock, Product } from '../../types'

const api = {
  item: {
    search: async (query: string) => {
      const encodedQuery = encodeURIComponent(query)
      const data = await fetch(
        `http://localhost:3000/api/items?q=${encodedQuery}`
      )
      const res = (await data.json()) as Mock

      const { products, limit, skip, total } = res

      return { products, limit, skip, total }
    },
    fetch: async (id: string) => {
      const data = await fetch(`http://localhost:3000/api/items/${id}`)
      const res = data.json() as Promise<Product>

      return res
    },
  },
}

export default api