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

const CreateAccount = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-3">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>
              Preencha o formulário abaixo para criar a sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Usuário</Label>
                <Input
                  id="user"
                  type="text"
                  placeholder="Digite seu nome aqui"
                  required
                />
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email aqui"
                  required
                />
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <InputPassword />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                </div>
                <InputPassword />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" variant="submitButton" className="w-full">
              Criar conta
            </Button>
          </CardFooter>
        </Card>
        <div className="text-center">
          <p className="text-xs">
            Já possui conta?
            <Button variant="link" asChild>
              <Link to="/Login" className="text-xs">
                Faça login
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
