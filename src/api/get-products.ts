import { api } from '@/lib/axios'

interface GetProductsQuery {
  status?: string | null
  search?: string | null
}

export type ProductStatus = 'available' | 'sold' | 'cancelled'

export type Product = {
  id: string
  title: string
  description: string
  priceInCents: number
  status: ProductStatus
  owner: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    } | null
  }
  category: {
    id: string
    title: string
    slug: string
  }
  attachments: Array<{
    id: string
    url: string
  }>
}

export interface GetProductsResponse {
  products: Product[]
}

export async function getProducts({ search, status }: GetProductsQuery) {
  const response = await api.get<GetProductsResponse>('/products/me', {
    params: {
      search,
      status,
    },
  })
  return response.data
}
