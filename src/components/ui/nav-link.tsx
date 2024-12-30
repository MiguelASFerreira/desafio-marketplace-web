import { HugeiconsProps } from 'hugeicons-react'
import { Link, LinkProps, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

type NavLinkProps = Omit<LinkProps, 'children'> & {
  title: string
  Icon: React.ComponentType<HugeiconsProps>
}

export function NavLink({
  Icon,
  to,
  title,
  className,
  ...props
}: NavLinkProps) {
  const { pathname } = useLocation()

  const isCurrentLocation = pathname === to

  return (
    <Link
      to={to}
      className={cn(
        'items-centers flex gap-2 px-4 py-2 text-sm',
        isCurrentLocation && 'rounded-lg bg-[#F5EAEA] text-primary',
        className,
      )}
      {...props}
    >
      <Icon className="h-5 w-5" />
      {title}
    </Link>
  )
}
