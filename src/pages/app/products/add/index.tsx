import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FileInput } from '@/components/ui/file-input'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const addProductSchema = z.object({
  title: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
  priceInCents: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório')
    .transform((value) => Number(value.replace(/\D/g, ''))),
  description: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
  categoryId: z.string({ required_error: 'Campo obrigatório' }),
  file: z
    .instanceof(FileList)
    .refine((fileList) => fileList?.length === 1, 'Campo obrigatório')
    .transform((fileList) => fileList.item(0)!),
})

type AddProductFormSchema = z.infer<typeof addProductSchema>

export function ProductsAdd() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<AddProductFormSchema>({
    resolver: zodResolver(addProductSchema),
  })

  async function handleAddProduct(data: AddProductFormSchema) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log(data)
  }
  return (
    <>
      <Helmet title="Adicionar Produto" />
      <div>
        <div>
          <h1 className="font-primary text-2xl font-bold text-[#1D1D1D]">
            Novo Produto
          </h1>
          <span className="font-primary text-sm text-[#666666]">
            Cadastre um produto para venda no marketplace
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-24">
          <FileInput
            containerProps={{
              className: 'h-auto max-h-[340px] w-[350px] col-span-1',
            }}
            label="Selecione a imagem do produto"
            form="add-product-form"
            {...register('file')}
          />
          <Card className="col-span-2 p-6">
            <CardHeader className="p-0">
              <h2 className="font-secondary text-lg">Dados do produto</h2>
            </CardHeader>
            <CardContent className="mt-8 p-0">
              <form
                id="add-product-form"
                onSubmit={handleSubmit(handleAddProduct)}
                className="flex flex-col gap-5"
              >
                <div className="flex w-full gap-5">
                  <Input
                    label="Título"
                    {...register('title')}
                    placeholder="Nome do produto"
                  />
                  <Input
                    label="Valor"
                    {...register('priceInCents')}
                    placeholder="R$ 0,00"
                  />
                </div>
                <Textarea
                  label="Descrição"
                  placeholder="Escreva detalhes sobre o produto, tamanho, características"
                  {...register('description')}
                />
                <Controller
                  name="categoryId"
                  control={control}
                  render={({
                    field: { name, onChange, value, disabled },
                    fieldState: { error },
                  }) => {
                    return (
                      <Select
                        label="Categoria"
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}
                        error={error?.message}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="toys">Brinquedo</SelectItem>
                          <SelectItem value="furniture">Móveis</SelectItem>
                          <SelectItem value="paper">Papelaria</SelectItem>
                          <SelectItem value="beauty">Saúde & Beleza</SelectItem>
                          <SelectItem value="utensils">Utensílios</SelectItem>
                          <SelectItem value="clothes">Vestuário</SelectItem>
                        </SelectContent>
                      </Select>
                    )
                  }}
                />
                <div className="flex gap-3">
                  <Link to="/products" className="w-full">
                    <Button type="button" variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </Link>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    Salvar e publicar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
