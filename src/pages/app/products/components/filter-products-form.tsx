import { zodResolver } from '@hookform/resolvers/zod'
import { SaleTag02Icon, Search01Icon } from 'hugeicons-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

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

const filterSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
})

type FilterSchema = z.infer<typeof filterSchema>

type FilterProductsFormProps = React.HTMLAttributes<HTMLDivElement> & {
  //
}

export function FilterProductsForm({ ...props }: FilterProductsFormProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search')
  const status = searchParams.get('status')

  const { register, handleSubmit, reset, control } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: search ?? undefined,
      status: status ?? undefined,
    },
  })

  function handleApplyFilters({ search, status }: FilterSchema) {
    setSearchParams((state) => {
      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
      }

      if (status) {
        state.set('status', status)
      } else {
        state.delete('status')
      }

      return state
    })
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete('search')
      state.delete('status')
      return state
    })

    reset({
      search: '',
      status: '',
    })
  }

  return (
    <Card {...props}>
      <CardHeader>
        <h2 className="font-secondary text-lg font-bold">Filtrar</h2>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(handleApplyFilters)}
          className="flex flex-col gap-5"
        >
          <Input
            placeholder="Pesquisar"
            LeftIcon={Search01Icon}
            {...register('search')}
          />

          <Controller
            name="status"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger LeftIcon={SaleTag02Icon}>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="announced">Anunciado</SelectItem>
                    <SelectItem value="sold">Vendido</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              )
            }}
          />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1">
              Aplicar filtro
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClearFilters}
              className="flex-1"
            >
              Limpar filtros
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
