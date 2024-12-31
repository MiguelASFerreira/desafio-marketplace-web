import * as React from 'react'

import { cn } from '@/lib/utils'
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="w-full border-b border-input transition-colors focus-within:text-ring">
        <span className="text-xs font-medium uppercase">{label}</span>
        <textarea
          className={cn(
            'flex min-h-[60px] w-full resize-none bg-transparent text-base text-gray-400 placeholder:text-muted-foreground focus:caret-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </label>
    )
  },
)
Textarea.displayName = 'Textarea'
export { Textarea }
