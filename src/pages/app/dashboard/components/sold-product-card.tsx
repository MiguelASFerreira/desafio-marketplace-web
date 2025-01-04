import { useQuery } from '@tanstack/react-query'
import { SaleTag02Icon } from 'hugeicons-react'

import { getSoldProducts } from '@/api/get-sold-products'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function SoldProductsCard() {
  const { data: soldProducts, isLoading: isLoadingSoldProducts } = useQuery({
    queryKey: ['sold-products'],
    queryFn: getSoldProducts,
  })
  return (
    <Card>
      {isLoadingSoldProducts ? (
        <Skeleton className="h-[105px] w-[239px]" />
      ) : (
        <CardContent className="flex items-center gap-4 p-3 pr-7">
          <div className="rounded-lg bg-blue-light p-5">
            <SaleTag02Icon className="h-10 w-10 text-blue-dark" />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <h2 className="font-secondary text-3xl text-[#3D3D3D]">
              {soldProducts?.amount}
            </h2>

            <p className="text-xs text-[#666666]">Produtos vendidos</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
