import { Label } from '@radix-ui/react-label'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './button'
import { Input } from './input'

const InputPassword = () => {
  const [seePwd, setseePwd] = useState(false)

  return (
    <>
      <div className="relative">
        <Button
          variant="ghost"
          className="absolute bottom-0 right-0 top-0 w-10"
          onClick={() => setseePwd(!seePwd)}
        >
          {seePwd ? (
            <EyeClosedIcon className="text-white" />
          ) : (
            <EyeIcon className="text-white" />
          )}
        </Button>
        <Input
          id="password"
          type={seePwd ? 'text' : 'password'}
          placeholder="Digite a sua senha"
          required
        />
      </div>
    </>
  )
}

export default InputPassword
