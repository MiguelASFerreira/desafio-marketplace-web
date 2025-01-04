import { ChartHistogramIcon, PackageIcon, PlusSignIcon } from 'hugeicons-react'
import { Link } from 'react-router-dom'

import logo from '@/assets/logo.svg'

import { AccountMenu } from './account-menu'
import { NavLink } from './ui/nav-link'

export function Header() {
  return (
    <div className="h-fit w-full border-b-2 border-b-[#F5EAEA]">
      <header className="mx-auto flex justify-between p-5">
        <Link to="/">
          <img src={logo} alt="" className="w-14" />
        </Link>

        <nav className="flex items-center justify-center gap-2">
          <NavLink Icon={ChartHistogramIcon} title="Dashboard" to="/" />
          <NavLink Icon={PackageIcon} title="Produtos" to="/products" />
        </nav>

        <section className="flex items-center gap-4">
          <Link
            to="/products/add"
            className="flex items-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            <PlusSignIcon className="h-5 w-5" />
            Novo produto
          </Link>

          <AccountMenu />
        </section>
      </header>
    </div>
  )
}
