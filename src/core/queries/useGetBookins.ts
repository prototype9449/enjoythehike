import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../trail'

export const useGetBookings = () => {
  const result = useQuery({queryKey: ["bookings"], queryFn: getBookings, refetchOnMount: false})
  const waitingBooking = result.data?.find(x => x.status === 'waiting')

  return result
}
