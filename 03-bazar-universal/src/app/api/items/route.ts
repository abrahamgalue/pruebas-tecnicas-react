import { NextRequest } from 'next/server'
import mock from '../../../../public/products.json'

const { products, limit, skip } = mock

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (query != null) {
    const results = [...products].filter(product =>
      product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )

    const total = results.length

    return Response.json({
      products: results,
      limit,
      skip,
      total,
    })
  }

  return Response.json(mock)
}
