import { api } from '@/lib/axios'

interface GetVisitorsAmountResponse {
  amount: number
}

export async function getVisitorsAmount() {
  const response = await api.get<GetVisitorsAmountResponse>(
    '/sellers/metrics/views',
  )

  return response.data
}
