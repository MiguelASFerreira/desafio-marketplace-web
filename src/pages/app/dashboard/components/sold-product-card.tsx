import { SaleTag02Icon } from 'hugeicons-react'

import { Card, CardContent } from '@/components/ui/card'

export function SoldProductsCard() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-3 pr-7">
        <div className="bg-blue-light rounded-lg p-5">
          <SaleTag02Icon className="text-blue-dark h-10 w-10" />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <h2 className="font-secondary text-3xl text-[#3D3D3D]">10</h2>

          <p className="text-xs text-[#666666]">Produtos vendidos</p>
        </div>
      </CardContent>
    </Card>
  )
}
