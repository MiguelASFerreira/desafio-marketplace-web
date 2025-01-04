import { useQuery } from '@tanstack/react-query'
import { format, getDate } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { UserMultipleIcon } from 'hugeicons-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getVisitorsAmountPerDay } from '@/api/get-visitors-amount-per-day'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

type CustomTooltipProps = {
  active?: boolean
  payload?: {
    payload: {
      date: string
      dateFormatted: string
      amount: number
    }
  }[]
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    return (
      <div className="flex flex-col gap-2 rounded-md bg-card p-3 shadow-md">
        <p className="text-xs text-gray-400">{data.dateFormatted}</p>
        <div className="flex gap-2">
          <UserMultipleIcon className="h-4 w-4" />

          <p className="text-xs">
            {data.amount <= 1
              ? `${data.amount} visitante`
              : `${data.amount} visitantes`}
          </p>
        </div>
      </div>
    )
  }

  return null
}

export function VisitorsAmountChartCard() {
  const { data } = useQuery({
    queryKey: ['visitors-amount-per-day'],
    queryFn: getVisitorsAmountPerDay,
  })

  const visitorsPerDay = data?.viewsPerDay.map((day) => ({
    ...day,
    date: getDate(day.date).toString().padStart(2, '0'),
    dateFormatted: format(day.date, "dd 'de' MMMM", { locale: ptBR }),
  }))

  return (
    <Card className="w-full p-6">
      <CardHeader className="flex w-full flex-row justify-between">
        <h1 className="font-secondary text-lg text-[#1D1D1D]">Visitantes</h1>

        <DateRangePicker />
      </CardHeader>

      <CardContent className="flex items-center gap-4">
        {visitorsPerDay ? (
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={visitorsPerDay} style={{ fontSize: 12 }}>
              <XAxis
                stroke="#666666"
                dataKey="date"
                tickLine={false}
                axisLine={false}
                dy={16}
              />

              <YAxis
                stroke="#666666"
                axisLine={false}
                tickLine={false}
                width={24}
              />

              <CartesianGrid
                vertical={false}
                className="stroke-gray-200 opacity-20"
                strokeDasharray="8"
              />

              <Tooltip content={<CustomTooltip />} cursor={false} />

              <Line
                type="natural"
                strokeWidth={2}
                dataKey="amount"
                stroke={colors.blue[400]}
                activeDot={true}
                dot={false}
                style={{
                  stroke: '#5EC5FD',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="my-auto flex h-[180px] w-full items-center justify-center">
            <LoadingSpinner />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
