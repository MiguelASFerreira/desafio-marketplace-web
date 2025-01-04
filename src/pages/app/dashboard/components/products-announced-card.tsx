import { useQuery } from '@tanstack/react-query'
import { Store04Icon } from 'hugeicons-react'

import { getProductsAnnounced } from '@/api/get-products-announced'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductsAnnouncedCard() {
  const { data: productsAnnounced, isLoading: isLoadingProductsAnnounced } =
    useQuery({
      queryKey: ['products-announced'],
      queryFn: getProductsAnnounced,
    })
  return (
    <Card>
      {isLoadingProductsAnnounced ? (
        <Skeleton className="h-[105px] w-[239px]" />
      ) : (
        <CardContent className="flex items-center gap-4 p-3 pr-7">
          <div className="rounded-lg bg-blue-light p-5">
            <Store04Icon className="h-10 w-10 text-blue-dark" />
          </div>

          <div className="flex flex-col justify-center gap-2">
            <h2 className="font-secondary text-3xl text-[#3D3D3D]">
              {productsAnnounced?.amount}
            </h2>

            <p className="text-xs text-[#666666]">Produtos anunciados</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
