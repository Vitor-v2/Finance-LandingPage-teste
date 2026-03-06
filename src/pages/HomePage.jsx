import { useContext } from 'react'
import { Navigate } from 'react-router'

import { Button } from '@/components/ui/button'
import Header from '@/components/ui/Header'
import { AuthContext } from '@/context/auth'

const HomePage = () => {
  const { user, initializing, signOut } = useContext(AuthContext)
  if (initializing) return null
  if (!user) {
    return <Navigate to="/Login" />
  }
  console.log(user)
  return (
    <>
      <Header />
      <h1>Bem-vindo {user.firstName}</h1>
      <Button onClick={signOut}>Sair</Button>
    </>
  )
}

export default HomePage
