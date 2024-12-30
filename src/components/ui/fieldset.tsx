import React from 'react'

import { cn } from '@/lib/utils'

export interface FieldsetProps
  extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: string
}

export function Fieldset({
  className,
  legend: fieldsetLegend,
  children,
  ...props
}: FieldsetProps) {
  return (
    <fieldset className={cn('flex flex-col', className)} {...props}>
      {fieldsetLegend && (
        <legend className="mb-5 text-lg font-bold text-[#1D1D1D]">
          {fieldsetLegend}
        </legend>
      )}

      {children}
    </fieldset>
  )
}
