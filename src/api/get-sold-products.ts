import { api } from '@/lib/axios'

interface GetSoldProductsResponse {
  amount: number
}

export async function getSoldProducts() {
  const response = await api.get<GetSoldProductsResponse>(
    '/sellers/metrics/products/sold',
  )

  return response.data
}
