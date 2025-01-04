/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { getSellerProfile } from '@/api/get-seller-profile'
import { signOut } from '@/api/sign-out'

import { Avatar, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const navigate = useNavigate()
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getSellerProfile,
  })

  const { mutateAsync: signOutFn } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate({
        pathname: '/sign-in',
      })
      toast.success('Deslogado com sucesso!')
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Erro no cadastro do usuário!',
      )
    },
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-12 w-12 rounded-xl">
          {isLoadingProfile ? (
            <Skeleton className="h-12 w-12 rounded-xl" />
          ) : (
            <AvatarImage src={profile?.seller.avatar.url} />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-46 mr-3">
        <DropdownMenuLabel className="flex flex-col">
          {isLoadingProfile ? (
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          ) : (
            <>
              <span>{profile?.seller.name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {profile?.seller.email}
              </span>
            </>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => signOutFn()}
            className="text-rose-500"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
