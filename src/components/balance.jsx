import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/useAuthContext'
import { userServices } from '@/services'

import CardBalance from './card-balance'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuthContext()
  const { data } = useQuery({
    queryKey: ['balance', user.id],
    queryFn: () => {
      const from = searchParams.get('from')
      const to = searchParams.get('to')
      return userServices.getBalance({ from, to })
    },
  })

  return (
    <div className="grid grid-cols-3">
      <CardBalance data={data?.balance} title="Balance" />
      <CardBalance data={data?.earnings} title="earnings" />
      <CardBalance data={data?.expenses} title="expenses" />
      <CardBalance data={data?.investments} title="investments" />
    </div>
  )
}

export default Balance
