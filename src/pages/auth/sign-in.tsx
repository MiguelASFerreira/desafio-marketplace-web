import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AccessIcon, ArrowRight02Icon, Mail02Icon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn({ email, password }: SignInForm) {
    try {
      await authenticate({ email, password })

      toast.success('Logado com sucesso!')

      navigate({
        pathname: '/',
      })
    } catch (error) {
      toast.error('Credenciais Inválidas!')
    }
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-6">
        <div className="w-[562.88px] rounded-[32px] bg-white px-[80px] py-[60.8px]">
          <div className="pb-[80px]">
            <div className="mb-10">
              <h1 className="font-secondary text-2xl font-bold text-[#1D1D1D]">
                Acesse sua conta
              </h1>
              <span className="font-primary text-sm text-[#666666]">
                Informe seu e-mail e senha para entrar
              </span>
            </div>

            <form
              onSubmit={handleSubmit(handleSignIn)}
              className="w-[402.88px] space-y-4"
            >
              <div className="space-y-2">
                <Input
                  label="E-MAIL"
                  placeholder="Seu e-mail cadastrado"
                  type="email"
                  LeftIcon={Mail02Icon}
                  {...register('email')}
                />
              </div>
              <div className="space-y-2">
                <PasswordInput
                  label="SENHA"
                  placeholder="Sua senha de acesso"
                  LeftIcon={AccessIcon}
                  {...register('password')}
                />
              </div>

              <Button isLoading={isPending} className="w-full" type="submit">
                Acessar
                <ArrowRight02Icon className="ml-auto" />
              </Button>
            </form>
          </div>

          <div>
            <span className="text-body-md text-[#666666]">
              Ainda não tem uma conta?
            </span>
            <Button variant="outline" className="mt-5 w-full" asChild>
              <Link to="/sign-up">
                Cadastrar
                <ArrowRight02Icon className="ml-auto" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
