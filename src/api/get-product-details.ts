import { api } from '@/lib/axios'

import { Product } from './get-products'

interface GetProductDetailsResponse {
  product: Product
}

export async function getProductDetails(productId: string) {
  const response = await api.get<GetProductDetailsResponse>(
    `/products/${productId}`,
  )

  return response.data
}
