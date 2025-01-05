import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ArrowLeft02Icon, Tick02Icon, UnavailableIcon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { changeProductStatus } from '@/api/change-product-status'
import { editProduct } from '@/api/edit-product'
import { getCategories } from '@/api/get-categories'
import { getProductDetails } from '@/api/get-product-details'
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
import { Skeleton } from '@/components/ui/skeleton'
import { ProductStatusTag } from '@/components/ui/status-tag'
import { Textarea } from '@/components/ui/textarea'
import { queryClient } from '@/lib/react-query'
import { formatMoney } from '@/utils/format-money'

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
    .transform((fileList) => fileList.item(0)!)
    .optional(),
})

type EditProductFormSchema = z.infer<typeof editProductSchema>

export function ProductsEdit() {
  const navigate = useNavigate()

  const { id: productId } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductDetails(String(productId)),
    staleTime: Infinity,
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity,
  })

  const { mutateAsync: editProductFn } = useMutation({
    mutationFn: editProduct,
    onError: (error) => {
      console.log(error)
      toast.error('Erro ao editar o produto', {
        description: 'Não foi possível editar o produto, tente novamente!',
      })
    },
    onSuccess: () => {
      toast.success('Sucesso!', {
        description: 'Produto atualizado com sucesso!',
      })
    },
  })

  const { mutateAsync: changeProductStatusFn } = useMutation({
    mutationFn: changeProductStatus,
    onError: () => {
      toast.error('Erro ao atualizar status', {
        description: 'Não foi possível atualizar o status, tente novamente!',
      })
    },
    onSuccess: () => {
      toast.success('Sucesso', {
        description: 'Status atualizado com sucesso!',
      })
    },
  })

  const product = data?.product

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<EditProductFormSchema>({
    resolver: zodResolver(editProductSchema),
    values: {
      title: product?.title ?? '',
      categoryId: product?.category.id ?? '',
      description: product?.description ?? '',
      priceInCents: formatMoney(
        (product?.priceInCents || 0) / 100,
      ) as unknown as number,
    },
  })

  const { mutateAsync: uploadAttachmentFn } = useMutation({
    mutationFn: uploadFile,
    onError: (error) => {
      console.log(error)
      toast.error('Erro ao editar o produto', {
        description: 'Não foi possível anexar a imagem, tente novamente!',
      })
    },
  })

  function updateProductsOnCache(updatedProduct: Product) {
    const productsListCache = queryClient.getQueriesData<Product[]>({
      queryKey: ['products'],
    })

    productsListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }

      queryClient.setQueryData<Product[]>(
        cacheKey,
        cacheData!.map((product) => {
          if (product.id === updatedProduct.id) {
            return updatedProduct
          }

          return product
        }),
      )
    })

    queryClient.setQueriesData(
      { queryKey: ['product', productId] },
      { product: updatedProduct },
    )
  }

  async function handleUpdateProductStatus(
    status: 'available' | 'cancelled' | 'sold',
  ) {
    await changeProductStatusFn({ productId: String(productId), status })

    if (product) {
      updateProductsOnCache({
        ...product,
        status,
      })
    }
  }

  async function handleEditProduct({
    categoryId,
    description,
    priceInCents,
    title,
    file,
  }: EditProductFormSchema) {
    const attachmentsIds: string[] = (product?.attachments || []).map(
      (attachment) => attachment.id,
    )

    if (file) {
      const { attachments } = await uploadAttachmentFn(file)

      attachmentsIds.push(...attachments.map((attachment) => attachment.id))
    }

    const { product: updatedProduct } = await editProductFn({
      productId: product?.id || '',
      title,
      priceInCents,
      categoryId,
      description,
      attachmentsIds,
    })

    updateProductsOnCache(updatedProduct)

    navigate({
      pathname: '/products',
    })
  }

  if (isLoading && !product) {
    return (
      <div className="flex flex-col">
        <Link to="/products" className="flex gap-2 text-sm text-primary">
          <ArrowLeft02Icon className="h-5 w-5" />
          Voltar
        </Link>

        <div className="mt-2 flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-secondary text-2xl font-bold text-gray-500">
              Editar produto
            </h1>

            <p className="text-sm">
              Gerencie as informações do produto cadastrado
            </p>
          </div>

          <div className="flex items-end gap-4">
            <Skeleton className="h-[20px] w-[180px]" />

            <Skeleton className="h-[20px] w-[180px]" />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4">
          <Skeleton className="h-[340px] w-full" />

          <Card className="relative col-span-2 p-8">
            <CardHeader className="p-0">
              <h2 className="font-secondary text-lg">Dados do produto</h2>

              <Skeleton className="absolute right-6 top-6 h-[25px] w-[100px] rounded-full px-2 py-1 text-xs uppercase text-primary-foreground" />
            </CardHeader>

            <CardContent className="mt-9 p-0">
              <div className="flex flex-col gap-5">
                <div className="flex w-full gap-5">
                  <Skeleton className="h-[55px] w-full" />

                  <Skeleton className="h-[55px] w-full" />
                </div>

                <Skeleton className="h-[90px] w-full" />

                <Skeleton className="h-[55px] w-full" />

                <div className="flex gap-3">
                  <Skeleton className="h-[50px] w-full" />

                  <Skeleton className="h-[50px] w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet title="Editar Produto" />
      <div>
        <div className="flex flex-col">
          <Link to="/products" className="flex gap-2 text-sm text-primary">
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
              <Button
                variant="ghost"
                className="h-fit p-0"
                onClick={() => handleUpdateProductStatus('sold')}
                disabled={
                  product?.status === 'sold' || product?.status === 'cancelled'
                }
              >
                <Tick02Icon className="mr-2 h-5 w-5" />
                Marcar como vendido
              </Button>
              <Button
                variant="ghost"
                className="h-fit p-0"
                onClick={() => handleUpdateProductStatus('cancelled')}
                disabled={
                  product?.status === 'sold' || product?.status === 'cancelled'
                }
              >
                <UnavailableIcon className="mr-2 h-5 w-5" />
                Desativar anúncio
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-20">
          <FileInput
            containerProps={{
              className: 'h-auto max-h-[340px] w-full col-span-1',
            }}
            label="Selecione a imagem do produto"
            form="add-product-form"
            {...register('file')}
            defaultValue={product?.attachments[0].url}
          />
          <Card className="relative col-span-2 p-4">
            <CardHeader className="p-0">
              <h2 className="font-secondary text-lg">Dados do produto</h2>
              <div className="absolute right-6 top-4">
                <ProductStatusTag status={product?.status || 'available'} />
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
                    error={errors.title?.message}
                    placeholder="Nome do produto"
                  />
                  <Input
                    label="Valor"
                    {...register('priceInCents')}
                    placeholder="R$ 0,00"
                    error={errors.priceInCents?.message}
                  />
                </div>
                <Textarea
                  label="Descrição"
                  placeholder="Escreva detalhes sobre o produto, tamanho, características"
                  {...register('description')}
                  error={errors.description?.message}
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
