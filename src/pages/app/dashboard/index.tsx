import { Helmet } from 'react-helmet-async'

import { ProductsAnnouncedCard } from './components/products-announced-card'
import { SoldProductsCard } from './components/sold-product-card'
import { VisitorsAmountChartCard } from './components/visitors-amount-chart-card'
import { VisitorsAmountCard } from './components/visitors-amout-card'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div>
        <div>
          <h1 className="font-primary text-2xl font-bold text-[#1D1D1D]">
            Últimos 30 dias
          </h1>
          <span className="font-primary text-sm text-[#666666]">
            Confira as estatísticas da sua loja no último mês
          </span>
        </div>

        <div className="mt-10 grid grid-cols-4 gap-6">
          <div className="col-span-1 flex w-[239px] flex-col gap-2">
            <SoldProductsCard />
            <ProductsAnnouncedCard />
            <VisitorsAmountCard />
          </div>

          <div className="col-span-3">
            <VisitorsAmountChartCard />
          </div>
        </div>
      </div>
    </>
  )
}
