import { useQuery } from 'react-query'
import { findTrails } from '../trail'
import { BookingFormValue } from '../../../gateway/src/types'

export const useGetTrails = (payload?: BookingFormValue) => {
  // @ts-ignore
  return useQuery(["trails", payload], () => findTrails(payload), {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
    retry: false
  });
}
