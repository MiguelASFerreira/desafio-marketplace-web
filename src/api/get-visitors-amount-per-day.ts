import { api } from '@/lib/axios'

interface ViewsPerDayProps {
  date: string
  amount: number
}

interface GetVisitorsAmountPerDayResponse {
  viewsPerDay: ViewsPerDayProps[]
}

export async function getVisitorsAmountPerDay() {
  const response = await api.get<GetVisitorsAmountPerDayResponse>(
    '/sellers/metrics/views/days',
  )

  return response.data
}
