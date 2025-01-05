import { AlertCircleIcon } from 'hugeicons-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, ...props }, ref) => {
    return (
      <label className="w-full transition-colors focus-within:text-ring">
        <div className="border-b border-input">
          <span className="text-xs font-medium uppercase">{label}</span>

          <textarea
            className={cn(
              'flex min-h-[60px] w-full resize-none bg-transparent text-base text-gray-400 placeholder:text-muted-foreground focus:caret-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
        </div>

        {error && (
          <div className="mt-1 flex gap-1 text-xs text-error">
            <AlertCircleIcon className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </label>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
