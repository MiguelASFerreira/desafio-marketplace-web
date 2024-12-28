import { zodResolver } from '@hookform/resolvers/zod'
import { AccessIcon, ArrowRight02Icon, Mail02Icon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

const signInForm = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  })

  async function handleSignIn(data: SignInForm) {
    await new Promise((resolve) => setTimeout(resolve, 5000))
  }
  return (
    <>
      <Helmet title="Login" />
      <div className="p-6">
        <div className="w-[562.88px] rounded-[32px] bg-white px-[80px] py-[60.8px]">
          <div className="pb-[130.88px]">
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

              <Button isLoading={isSubmitting} className="w-full" type="submit">
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
