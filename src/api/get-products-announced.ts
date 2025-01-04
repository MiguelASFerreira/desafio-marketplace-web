import { api } from '@/lib/axios'

interface GetProductsAnnouncedResponse {
  amount: number
}

export async function getProductsAnnounced() {
  const response = await api.get<GetProductsAnnouncedResponse>(
    '/sellers/metrics/products/available',
  )

  return response.data
}
