import { AlertCircleIcon, ImageUploadIcon } from 'hugeicons-react'
import React, { useState } from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  containerProps?: React.LabelHTMLAttributes<HTMLLabelElement>
}

const FileInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  (
    { className, error, label, containerProps, defaultValue, ...props },
    ref,
  ) => {
    const [image, setImage] = useState<string | undefined>(String(defaultValue))

    function handleChooseImage(event: React.ChangeEvent<HTMLInputElement>) {
      const input = event.target

      const image = input.files?.item(0)

      if (image) {
        setImage(URL.createObjectURL(image))
      }
    }

    const isImageVisible =
      image && typeof image === 'string' && image.startsWith('blob:')

    return (
      <>
        <label
          title={props.title}
          {...containerProps}
          className={cn(
            'relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl bg-[#F5EAEA]',
            containerProps?.className,
          )}
        >
          <ImageUploadIcon className="h-8 w-8 text-primary" />

          {label && <span className="text-center text-sm">{label}</span>}

          <input
            type="file"
            // accept="image/png"
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
              src={image || ''}
              alt=""
              className={cn('absolute h-full w-full rounded-xl object-cover', {
                hidden: !isImageVisible,
              })}
            />
          )}
        </label>
        {error && (
          <div className="mt-1 flex gap-1 text-xs text-error">
            <AlertCircleIcon className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </>
    )
  },
)
FileInput.displayName = 'FileInput'

export { FileInput }
