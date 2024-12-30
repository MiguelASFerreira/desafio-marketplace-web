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

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'

const data = [
  { date: 1, dateFormatted: '1 de setembro', amount: 150 },
  { date: 2, dateFormatted: '2 de setembro', amount: 100 },
  { date: 3, dateFormatted: '3 de setembro', amount: 20 },
  { date: 4, dateFormatted: '4 de setembro', amount: 110 },
  { date: 5, dateFormatted: '5 de setembro', amount: 96 },
  { date: 6, dateFormatted: '6 de setembro', amount: 98 },
  { date: 7, dateFormatted: '7 de setembro', amount: 100 },
  { date: 8, dateFormatted: '8 de setembro', amount: 120 },
  { date: 9, dateFormatted: '9 de setembro', amount: 130 },
  { date: 10, dateFormatted: '10 de setembro', amount: 100 },
  { date: 11, dateFormatted: '11 de setembro', amount: 102 },
  { date: 12, dateFormatted: '12 de setembro', amount: 95 },
  { date: 13, dateFormatted: '13 de setembro', amount: 120 },
  { date: 14, dateFormatted: '14 de setembro', amount: 99 },
  { date: 15, dateFormatted: '15 de setembro', amount: 150 },
]

type CustomTooltipProps = {
  active?: boolean
  payload?: {
    payload: (typeof data)[0]
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
          <p className="text-xs">{data.amount} visitantes</p>
        </div>
      </div>
    )
  }

  return null
}

export function VisitorsAmountChartCard() {
  return (
    <Card className="w-full p-6">
      <CardHeader className="flex w-full flex-row justify-between">
        <h1 className="font-secondary text-lg text-[#1D1D1D]">Visitantes</h1>

        <DateRangePicker />
      </CardHeader>

      <CardContent className="flex items-center gap-4">
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data} style={{ fontSize: 12 }}>
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
      </CardContent>
    </Card>
  )
}
