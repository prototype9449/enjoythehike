import { BookingFormValue } from '../../BookingForm/types'
import { useQuery } from 'react-query'
import { findTrails } from '../trail'

export const useGetTrails = (payload?: BookingFormValue) => {
  // @ts-ignore
  return useQuery(["trails", payload], () => findTrails(payload), {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
    retry: false
  });
}
