import { Helmet } from 'react-helmet-async'

import { FilterProductsForm } from './components/filter-products-form'
import { ProductCard } from './components/product-card'

export function Products() {
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
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
