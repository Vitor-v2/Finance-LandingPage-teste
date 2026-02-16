import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import InputPassword from '@/components/ui/password-input'

const SingUp = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-3">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Entre na sua conta</CardTitle>
            <CardDescription>
              Insira seu email abaixo para entrar na sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="absolute bottom-0 right-0 top-0 w-10"
                  >
                    <EyeIcon className="text-white" />
                  </Button>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <InputPassword />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button variant="submitButton" className="w-full bg-submitButton">
              Criar conta
            </Button>
            <Button variant="outline" className="w-full">
              Entre com o Google
            </Button>
          </CardFooter>
        </Card>
        <div className="text-center">
          <p className="text-xs">
            Possui conta?
            <Button variant="link" asChild>
              <Link to="/Create" className="text-xs">
                Registre-se aqui
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingUp
