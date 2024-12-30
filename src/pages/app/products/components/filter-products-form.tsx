import { SaleTag02Icon, Search01Icon } from 'hugeicons-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type FilterProductsFormProps = React.HTMLAttributes<HTMLDivElement> & {
  //
}

export function FilterProductsForm({ ...props }: FilterProductsFormProps) {
  return (
    <Card {...props}>
      <CardHeader>
        <h2 className="font-secondary text-lg font-bold">Filtrar</h2>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-5">
          <Input placeholder="Pesquisar" LeftIcon={Search01Icon} />

          <Select>
            <SelectTrigger LeftIcon={SaleTag02Icon}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="announced">Anunciado</SelectItem>
              <SelectItem value="sold">Vendido</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>

          <Button className="mt-5">Aplicar filtro</Button>
        </form>
      </CardContent>
    </Card>
  )
}
