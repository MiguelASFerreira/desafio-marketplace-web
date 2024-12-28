import { HugeiconsProps, ViewIcon, ViewOffIcon } from 'hugeicons-react'
import * as React from 'react'

import { Input, InputProps } from './input'

type PasswordVisibilityToggleComponentProps = HugeiconsProps & {
  isShown: boolean
  onToggle: () => void
}

function PasswordVisibilityToggleComponent({
  isShown,
  onToggle,
  ...props
}: PasswordVisibilityToggleComponentProps) {
  if (isShown) {
    return (
      <button aria-label="Mostrar senha" onClick={onToggle}>
        <ViewOffIcon {...props} />
      </button>
    )
  }

  return (
    <button aria-label="Esconder senha" onClick={onToggle}>
      <ViewIcon {...props} />
    </button>
  )
}

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, 'type'>
>(({ ...props }, ref) => {
  const [isPasswordShown, setIsPasswordShown] = React.useState(false)

  function togglePasswordShown() {
    setIsPasswordShown((state) => !state)
  }

  return (
    <Input
      type={isPasswordShown ? 'text' : 'password'}
      ref={ref}
      RightIcon={(props) => (
        <PasswordVisibilityToggleComponent
          onToggle={togglePasswordShown}
          isShown={isPasswordShown}
          {...props}
        />
      )}
      {...props}
    />
  )
})
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
