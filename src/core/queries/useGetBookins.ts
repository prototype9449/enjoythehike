import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../bookings'

export const useGetBookings = () => {
  return useQuery({queryKey: ["bookings"], queryFn: getBookings, refetchOnMount: false})
}
