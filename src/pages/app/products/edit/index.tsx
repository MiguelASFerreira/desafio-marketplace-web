import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft02Icon, Tick02Icon, UnavailableIcon } from 'hugeicons-react'
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

const editProductSchema = z.object({
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

type EditProductFormSchema = z.infer<typeof editProductSchema>

export function ProductsEdit() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<EditProductFormSchema>({
    resolver: zodResolver(editProductSchema),
  })

  async function handleEditProduct(data: EditProductFormSchema) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
    console.log(data)
  }
  return (
    <>
      <Helmet title="Adicionar Produto" />
      <div>
        <div className="flex flex-col">
          <Link
            to="/products"
            className="mb-[8px] flex gap-2 text-sm text-primary"
          >
            <ArrowLeft02Icon /> Voltar
          </Link>

          <div className="flex justify-between">
            <div>
              <h1 className="mt-2 font-primary text-2xl font-bold text-[#1D1D1D]">
                Editar Produto
              </h1>
              <span className="font-primary text-sm text-[#666666]">
                Gerencie as informações do produto cadastrado
              </span>
            </div>

            <div className="flex items-end gap-4">
              <Button variant="ghost" className="h-fit p-0">
                <Tick02Icon className="mr-2 h-5 w-5" />
                Marcar como vendido
              </Button>
              <Button variant="ghost" className="h-fit p-0">
                <UnavailableIcon className="mr-2 h-5 w-5" />
                Desativar anúncio
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-24">
          <FileInput
            containerProps={{
              className: 'h-auto max-h-[340px] w-[415px] col-span-1',
            }}
            label="Selecione a imagem do produto"
            form="add-product-form"
            {...register('file')}
          />
          <Card className="relative col-span-2 p-8">
            <CardHeader className="p-0">
              <h2 className="font-secondary text-lg">Dados do produto</h2>
              <div className="absolute right-6 top-6 rounded-full bg-blue-dark px-2 py-1 text-xs uppercase text-primary-foreground">
                Anunciado
              </div>
            </CardHeader>
            <CardContent className="mt-8 p-0">
              <form
                id="add-product-form"
                onSubmit={handleSubmit(handleEditProduct)}
                className="flex flex-col gap-5"
              >
                <div className="flex w-full gap-5">
                  <Input
                    label="Título"
                    {...register('title')}
                    placeholder="Nome do produto"
                    value="Sofá"
                  />
                  <Input
                    label="Valor"
                    {...register('priceInCents')}
                    placeholder="R$ 0,00"
                    value="R$ 1200,90"
                  />
                </div>
                <Textarea
                  label="Descrição"
                  placeholder="Escreva detalhes sobre o produto, tamanho, características"
                  {...register('description')}
                  value={
                    'Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.'
                  }
                />
                <Controller
                  name="categoryId"
                  control={control}
                  defaultValue="furniture"
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
