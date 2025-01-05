import { api } from '@/lib/axios'

import { Product } from './get-products'

interface ChangeProductStatusBody {
  productId: string
  status: 'available' | 'cancelled' | 'sold'
}

type ChangeProductStatusResponse = {
  product: Product
}

export async function changeProductStatus({
  productId,
  status,
}: ChangeProductStatusBody) {
  const response = await api.patch<ChangeProductStatusResponse>(
    `/products/${productId}/${status}`,
  )

  return response.data
}
