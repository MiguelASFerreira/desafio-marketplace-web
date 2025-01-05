import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'

import { getProducts } from '@/api/get-products'
import { ProductCardSkeleton } from '@/components/product-card-skeleton'

import { FilterProductsForm } from './components/filter-products-form'
import { ProductCard } from './components/product-card'

export function Products() {
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')
  const status = searchParams.get('status')

  const { data: result, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', search, status],
    queryFn: () =>
      getProducts({
        search,
        status,
      }),
  })

  console.log(result)
  return (
    <>
      <Helmet title="Produtos" />
      <div>
        <div>
          <h1 className="font-primary text-2xl font-bold text-[#1D1D1D]">
            Seus Produtos
          </h1>
          <span className="font-primary text-sm text-[#666666]">
            Acesse gerencie a sua lista de produtos à venda
          </span>
        </div>

        <div className="my-10 grid grid-cols-3 gap-6">
          <FilterProductsForm className="col-span-1 h-fit" />

          <div className="col-span-2 flex flex-wrap gap-2">
            {!isLoadingProducts &&
              result &&
              result.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}

            {isLoadingProducts &&
              Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
