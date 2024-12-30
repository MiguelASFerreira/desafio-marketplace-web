import { Store04Icon } from 'hugeicons-react'

import { Card, CardContent } from '@/components/ui/card'

export function ProductsAnnouncedCard() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-3 pr-7">
        <div className="bg-blue-light rounded-lg p-5">
          <Store04Icon className="text-blue-dark h-10 w-10" />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <h2 className="font-secondary text-3xl text-[#3D3D3D]">56</h2>

          <p className="text-xs text-[#666666]">Produtos anunciados</p>
        </div>
      </CardContent>
    </Card>
  )
}
