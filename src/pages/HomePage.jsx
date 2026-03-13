import { Navigate } from 'react-router'

import Balance from '@/components/balance'
import Header from '@/components/Header'
import ButtonTransaction from '@/components/new-transaction-button'
import PickCalendar from '@/components/pickdate-calendar'
import { useAuthContext } from '@/context/useAuthContext'

const HomePage = () => {
  const { user, initializing } = useAuthContext()
  if (initializing) return null
  if (!user) {
    return <Navigate to="/Login" />
  }
  return (
    <div>
      <Header />
      <main className="flex flex-col gap-5 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">DashBoard</h2>
          <div className="flex gap-5">
            <PickCalendar />
            <ButtonTransaction/>
          </div>
        </div>
        <div>
          <Balance />
        </div>
      </main>
    </div>
  )
}

export default HomePage
