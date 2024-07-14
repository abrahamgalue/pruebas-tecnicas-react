import { NextRequest, NextResponse } from 'next/server'
import mock from '../../../../../public/products.json'

const { products } = mock

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id)

  if (id != null) {
    const res = [...products].find(product => product.id === id)
    return NextResponse.json(res)
  }

  return NextResponse.json(mock)
}
