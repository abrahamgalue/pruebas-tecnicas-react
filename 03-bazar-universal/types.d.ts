export interface Mock {
  products: Product[]
  total: number
  skip: number
  limit: number
  categories?: ProductCategories[]
  status: reqStatus
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  status: reqStatus
}

type reqStatus = 404 | 'active'

export interface ProductCategories {
  name: string
  quantity: number
}
