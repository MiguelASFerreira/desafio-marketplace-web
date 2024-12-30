import { AlertCircleIcon, HugeiconsProps } from 'hugeicons-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  LeftIcon?: React.ComponentType<HugeiconsProps>
  RightIcon?: React.ComponentType<HugeiconsProps>
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, label, LeftIcon, RightIcon, ...props }, ref) => {
    return (
      <label
        className={cn(
          'flex w-full flex-col transition-colors focus-within:text-ring',
          error
            ? '[&:not(:focus-within)]:text-error'
            : '[&:not(:focus-within)]:text-gray-500',
        )}
      >
        <div className="border-b border-input">
          <span className="text-xs font-medium uppercase">{label}</span>

          <div className="flex items-center gap-2">
            {LeftIcon && (
              <LeftIcon className={cn('h-6 w-6', error ? 'text-error' : '')} />
            )}

            <input
              type={type}
              className={cn(
                'flex h-9 w-full text-base text-[#1D1D1D] file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus:caret-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                className,
              )}
              ref={ref}
              {...props}
            />

            {RightIcon && <RightIcon className="h-6 w-6" />}
          </div>
        </div>

        {error && (
          <div className="text-error mt-1 flex gap-1 text-xs">
            <AlertCircleIcon className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </label>
    )
  },
)
Input.displayName = 'Input'

export { Input }
