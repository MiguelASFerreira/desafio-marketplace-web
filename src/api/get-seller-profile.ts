import { api } from '@/lib/axios'

interface SellerProps {
  id: string
  name: string
  phone: string
  email: string
  avatar: {
    id: string
    url: string
  }
}

interface GetSellerProfileResponse {
  seller: SellerProps
}

export async function getSellerProfile() {
  const response = await api.get<GetSellerProfileResponse>('/sellers/me')

  return response.data
}
