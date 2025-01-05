import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { createProduct } from '@/api/create-product'
import { getCategories } from '@/api/get-categories'
import { Product } from '@/api/get-products'
import { uploadFile } from '@/api/upload-file'
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
import { queryClient } from '@/lib/react-query'

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
  const navigate = useNavigate()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  })

  const { mutateAsync: uploadAttachmentFn } = useMutation({
    mutationFn: uploadFile,
    onError: () => {
      toast.error('Erro ao criar o produto', {
        description: 'Não foi possível anexar a imagem, tente novamente!',
      })
    },
  })

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
    onError: () => {
      toast.error('Erro ao criar o produto', {
        description: 'Não foi possível criar o produto, tente novamente!',
      })
    },
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AddProductFormSchema>({
    resolver: zodResolver(addProductSchema),
  })

  function updateProductsOnCache(product: Product) {
    const productsListCache = queryClient.getQueryData<Product[]>(['products'])

    if (!productsListCache) {
      return
    }

    queryClient.setQueryData(['products'], [...productsListCache, product])
  }

  async function handleAddProduct({
    title,
    priceInCents,
    categoryId,
    description,
    file,
  }: AddProductFormSchema) {
    const { attachments } = await uploadAttachmentFn(file)

    const { product } = await createProductFn({
      title,
      priceInCents,
      categoryId,
      description,
      attachmentsIds: attachments.map((attachment) => attachment.id),
    })

    updateProductsOnCache(product)

    toast.success('Sucesso!', {
      description: 'Produto criado com sucesso!',
    })

    navigate('/products', { replace: true })
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
                    error={errors.title?.message}
                    placeholder="Nome do produto"
                  />
                  <Input
                    label="Valor"
                    {...register('priceInCents')}
                    error={errors.title?.message}
                    format="money"
                    placeholder="R$ 0,00"
                  />
                </div>
                <Textarea
                  label="Descrição"
                  placeholder="Escreva detalhes sobre o produto, tamanho, características"
                  error={errors.description?.message}
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
                          {categories?.map((category) => {
                            return (
                              <SelectItem key={category.id} value={category.id}>
                                {category.title}
                              </SelectItem>
                            )
                          })}
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
