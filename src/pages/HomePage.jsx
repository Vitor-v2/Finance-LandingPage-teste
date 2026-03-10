import { Plus } from 'lucide-react'
import { Navigate } from 'react-router'

import Balance from '@/components/balance'
import Header from '@/components/Header'
import PickCalendar from '@/components/pickdate-calendar'
import { Button } from '@/components/ui/button'
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
            <Button variant="submitButton" className="rounded-5">
              Nova transação <Plus />{' '}
            </Button>
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
