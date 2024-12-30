'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar04Icon } from 'hugeicons-react'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  const formattedFrom = date?.from
    ? format(date?.from, "dd 'de' MMMM", { locale: ptBR }).toUpperCase()
    : ''

  const formattedTo = date?.to
    ? format(date?.to, "dd 'de' MMMM", { locale: ptBR }).toUpperCase()
    : ''

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'ghost'}
            className={cn(
              'justify-start text-left font-medium',
              !date && 'text-muted-foreground',
            )}
          >
            <Calendar04Icon className="text-blue-dark mr-2 h-4 w-4" />

            {date?.from ? (
              date.to ? (
                `${formattedFrom} - ${formattedTo}`
              ) : (
                formattedFrom
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
