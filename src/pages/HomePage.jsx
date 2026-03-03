import { useContext } from 'react'
import { Navigate } from 'react-router'

import { Button } from '@/components/ui/button'
import { AuthContext } from '@/context/auth'

const HomePage = () => {
  const { user, initializing, signOut } = useContext(AuthContext)
  if (initializing) return null
  if (!user) {
    return <Navigate to="/Login" />
  }
  return (
    <>
      <h1>Bem-vindo {user.first_name}</h1>
      <Button onClick={signOut}>Sair</Button>
    </>
  )
}

export default HomePage
