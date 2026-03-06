import { Navigate } from 'react-router'

import DateSelected from '@/components/date-selected'
import Header from '@/components/header'
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
      <div className="p-5">
        <h1 className="text-xl">DashBoard</h1>
        <DateSelected />
      </div>
    </>
  )
}

export default HomePage
