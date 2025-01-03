/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import {
  AccessIcon,
  ArrowRight02Icon,
  Call02Icon,
  Mail02Icon,
  UserIcon,
} from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signUp } from '@/api/sign-up'
import { uploadFile } from '@/api/upload-file'
import { Button } from '@/components/ui/button'
import { Fieldset } from '@/components/ui/fieldset'
import { FileInput } from '@/components/ui/file-input'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { formatPhone } from '@/utils/format-phone'

const signUpForm = z
  .object({
    name: z.string().nonempty({ message: 'Nome é obrigatório' }),
    email: z.string().email({
      message: 'E-mail Inválido',
    }),
    password: z.string().nonempty({ message: 'Senha é obrigatória' }),
    passwordConfirmation: z
      .string()
      .nonempty({ message: 'Confirmação de senha é obrigatória' }),
    phone: z.string().nonempty({ message: 'Telefone é obrigatório' }),
    file: z
      .instanceof(FileList)
      .refine((fileList) => fileList?.length === 1, 'Campo obrigatório')
      .transform((fileList) => fileList.item(0)!),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation
    },
    {
      message: 'Senhas não são iguais',
      path: ['passwordConfirmation'],
    },
  )

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const { register, handleSubmit, formState, setValue } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  })
  const { errors } = formState

  const { mutateAsync: uploadFileFn } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      toast.success('Sucesso ao fazer upload da imagem!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Erro no cadastro do usuário!',
      )
    },
  })

  const { mutateAsync: registerSeller, isPending: isPendingSeller } =
    useMutation({
      mutationFn: signUp,
      onSuccess: () => {
        toast.success('Sucesso ao cadastrar o usuário!')
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || 'Erro no cadastro do usuário!',
        )
      },
    })

  async function handleSignUp(data: SignUpForm) {
    const { attachments } = await uploadFileFn(data.file)

    await registerSeller({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      avatarId: attachments[0].id,
    })
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formattedPhone = formatPhone(e.target.value)
    setValue('phone', formattedPhone, { shouldValidate: true })
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-6">
        <div className="w-[562.88px] rounded-[32px] bg-white px-[80px] py-[60.8px]">
          <div className="pb-[80px]">
            <div className="mb-10">
              <h1 className="font-secondary text-2xl font-bold text-[#1D1D1D]">
                Crie sua conta
              </h1>
              <span className="font-primary text-sm text-[#666666]">
                Informe os seus dados pessoais e de acesso
              </span>
            </div>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <Fieldset className="space-y-4" legend="Perfil">
                <FileInput
                  title="Upload de imagem"
                  {...register('file')}
                  error={errors.file?.message}
                />

                <Input
                  placeholder="Seu nome completo"
                  label="NOME"
                  LeftIcon={UserIcon}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <Input
                  placeholder="(00) 00000-0000"
                  label="TELEFONE"
                  LeftIcon={Call02Icon}
                  error={errors.phone?.message}
                  {...register('phone')}
                  onChange={handlePhoneChange}
                />
              </Fieldset>

              <Fieldset className="mt-5 space-y-4" legend="Acesso">
                <Input
                  placeholder="Seu e-mail de acesso"
                  label="E-MAIL"
                  LeftIcon={Mail02Icon}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <PasswordInput
                  label="SENHA"
                  placeholder="Sua senha de acesso"
                  LeftIcon={AccessIcon}
                  error={errors.password?.message}
                  {...register('password')}
                />

                <PasswordInput
                  label="CONFIRMAR SENHA"
                  placeholder="Sua senha de acesso"
                  LeftIcon={AccessIcon}
                  error={errors.passwordConfirmation?.message}
                  {...register('passwordConfirmation')}
                />
              </Fieldset>

              <Button
                isLoading={isPendingSeller}
                className="mt-[48px] w-full"
                type="submit"
              >
                Adicionar
              </Button>
            </form>
          </div>

          <div>
            <span className="text-body-md text-[#666666]">
              Já tem uma conta?
            </span>
            <Button variant="outline" className="mt-5 w-full" asChild>
              <Link to="/sign-in">
                Acessar
                <ArrowRight02Icon className="ml-auto" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
