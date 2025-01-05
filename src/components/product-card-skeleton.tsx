import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { Skeleton } from './ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <Card
      role="button"
      className="hover:border-blue-base min-w-[320px] cursor-pointer border border-transparent transition-all"
    >
      <CardHeader className="relative p-1 pb-0">
        <Skeleton className="h-[144px] rounded-[20px]" />
      </CardHeader>

      <CardContent className="flex flex-col gap-2 p-4 pb-5">
        <div className="flex justify-between">
          <Skeleton className="h-[24px] w-[200px]" />

          <Skeleton className="h-[24px] w-[70px]" />
        </div>

        <Skeleton className="h-[40px]" />
      </CardContent>
    </Card>
  )
}
