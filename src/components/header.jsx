import { ChevronDown, LogOutIcon, UserRound } from 'lucide-react'

import { useAuthContext } from '@/context/useAuthContext'

import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent, CardTitle } from './ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Header = () => {
  const { user, signOut } = useAuthContext()

  return (
    <Card>
      <CardContent className="flex justify-between p-5">
        <div className="flex items-center gap-5">
          <CardTitle>Título</CardTitle>
          <Button variant="ghost">DashBoard</Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
              {user.firstName} {user.lastName}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
            <DropdownMenuItem>
              <Button variant="ghost" className="w-full" onClick={signOut}>
                {' '}
                <LogOutIcon /> Sair
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

export default Header
