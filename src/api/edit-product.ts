import { api } from '@/lib/axios'

import { Product } from './get-products'

interface EditProductBody {
  productId: string
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

interface EditProductResponse {
  product: Product
}

export async function editProduct({
  productId,
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: EditProductBody) {
  const response = await api.put<EditProductResponse>(
    `/products/${productId}`,
    {
      title,
      categoryId,
      description,
      priceInCents,
      attachmentsIds,
    },
  )

  return response.data
}
