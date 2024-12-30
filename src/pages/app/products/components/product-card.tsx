import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function ProductCard() {
  return (
    <Card
      role="button"
      className="hover:border-blue-base h-[250px] w-[320px] cursor-pointer border border-transparent transition-all"
    >
      <CardHeader className="relative p-1 pb-0">
        <img
          className="h-[144px] w-[323px] rounded-[20px]"
          src="https://images.unsplash.com/photo-1512212621149-107ffe572d2f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />

        <div className="absolute right-3 top-3 flex gap-1">
          <div className="bg-blue-dark rounded-full px-2 py-1 text-xs uppercase text-primary-foreground">
            Anunciado
          </div>

          <div className="rounded-full bg-gray-400 px-2 py-1 text-xs uppercase text-primary-foreground">
            Móvel
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 p-4 pb-5">
        <div className="flex justify-between text-[#1D1D1D]">
          <h3 className="font-semibold">Sofá</h3>

          <p className="font-secondary text-lg font-bold text-[#1D1D1D]">
            <span className="font-primary text-xs font-medium">R$</span>
            1.200,90
          </p>
        </div>

        <p className="line-clamp-2 text-sm text-[#666666]">
          Sofá revestido em couro legítimo, com estrutura em madeira maciça e
          pés em metal cromado.
        </p>
      </CardContent>
    </Card>
  )
}
