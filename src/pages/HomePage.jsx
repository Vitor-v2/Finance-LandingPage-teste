import { Navigate } from 'react-router'

import Header from '@/components/Header'
import { useAuthContext } from '@/context/useAuthContext'

const HomePage = () => {
  const { user, initializing } = useAuthContext()
  if (initializing) return null
  if (!user) {
    return <Navigate to="/Login" />
  }
  return (
    <>
      <Header />
      <h1>Bem-vindo {user.firstName}</h1>
    </>
  )
}

export default HomePage
