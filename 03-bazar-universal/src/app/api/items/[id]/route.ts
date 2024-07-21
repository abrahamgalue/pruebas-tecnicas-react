import { NextRequest, NextResponse } from 'next/server'
import mock from '../../../../../public/products.json'
import { mErrorObj } from '@/app/lib/utils'

const { products } = mock

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = Number(params.id)

  const res = [...products].find(product => product.id === id)

  if (res == undefined) {
    return Response.json(mErrorObj(String(id)))
  }

  return NextResponse.json({ ...res, status: 'active' })
}
