import { NextRequest } from 'next/server'
import mock from '../../../../public/products.json'
import { ProductCategories } from '../../../../types'

const { products, limit, skip } = mock

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (query != null) {
    const results = [...products].filter(product =>
      product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )

    const total = results.length

    const categories: ProductCategories[] = results.reduce(
      (acc: ProductCategories[], product) => {
        const { category } = product
        const existingCategory = acc.find(c => c.name === category)
        if (existingCategory) {
          existingCategory.quantity++
        } else {
          acc.push({ name: category, quantity: 1 })
        }
        return acc
      },
      []
    )

    return Response.json({
      products: results,
      limit,
      skip,
      total,
      categories,
    })
  }

  return Response.json(mock)
}
