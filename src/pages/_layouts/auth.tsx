import { Outlet } from 'react-router-dom'

import background from '../../assets/background.png'
import logoName from '../../assets/logo-and-name.svg'

export function AuthLayout() {
  return (
    <div className="grid h-screen grid-cols-2 bg-[#FBF4F4]">
      <div className="relative h-full">
        <div className="pb-4 pl-[2.5rem] pt-[2.5rem]">
          <img src={logoName} alt="" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={background} alt="" />
        </div>
      </div>

      <main className="flex h-full justify-center overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
