import { ImageUploadIcon } from 'hugeicons-react'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  containerProps?: React.LabelHTMLAttributes<HTMLLabelElement>
}

const FileInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  ({ className, label, containerProps, defaultValue, ...props }, ref) => {
    const [image, setImage] = useState<string | undefined>(String(defaultValue))

    function handleChooseImage(event: React.ChangeEvent<HTMLInputElement>) {
      const input = event.target

      const image = input.files?.item(0)

      if (image) {
        setImage(URL.createObjectURL(image))
      }
    }

    return (
      <label
        title={props.title}
        {...containerProps}
        className={cn(
          'bg-shape relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl',
          containerProps?.className,
        )}
      >
        <ImageUploadIcon className="h-8 w-8 text-primary" />

        {label && <span className="text-center text-sm">{label}</span>}

        <input
          type="file"
          className={cn('hidden', className)}
          ref={ref}
          {...props}
          onChange={(e) => {
            handleChooseImage(e)

            if (props.onChange) {
              props.onChange(e)
            }
          }}
        />

        {image && (
          <img
            src={image}
            alt=""
            className="absolute h-full w-full rounded-xl object-cover"
          />
        )}
      </label>
    )
  },
)
FileInput.displayName = 'FileInput'

export { FileInput }
