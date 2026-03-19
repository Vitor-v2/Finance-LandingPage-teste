import { useQueryClient } from '@tanstack/react-query'
import { addMonths, format, isValid } from 'date-fns'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { useAuthContext } from '@/context/useAuthContext'

import { DatePickerWithRange } from './ui/calendar-range'

 const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd') 
}

    const dateValidation = (searchParams) => {
      const from = searchParams.get('from').match(/^\d{4}-\d{2}-\d{2}$/gm)
      const to = searchParams.get('to').match(/^\d{4}-\d{2}-\d{2}$/gm)

    const defaultDate = {
      from: new Date(),
      to: addMonths(new Date(), 1)
    }
    
    if(!from || !to) return defaultDate
    const dateAreinvalid = !isValid(new Date(from)) || !isValid(new Date(to)) 
    if(dateAreinvalid) {
      return defaultDate
    }
    
    return {
      from: new Date(from + 'T03:00:00'),
        to: new Date(to + 'T03:00:00'),
    }
  }


export const PickCalendar = () => {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const { user } = useAuthContext()

  const [date, setDate] = useState(  
  dateValidation(searchParams)
)

  const navigate = useNavigate()

  useEffect(() => {
    if (!date.from || !date.to) return
    const queryParams = new URLSearchParams()
    queryParams.set('from', formatDate(date.from))
    queryParams.set('to', formatDate(date.to))
    navigate(`/?${queryParams.toString()}`)
    queryClient.invalidateQueries({
      queryKey: ['balance', user.id, formatDate(date.from), formatDate(date.to)]
    })
  }, [navigate, date, queryClient, user])

  return <DatePickerWithRange value={date} onChange={setDate} />
}
export default PickCalendar
