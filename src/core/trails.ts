import { BookingFormValue, Trail } from '../../gateway/src/types'
import queryString from 'query-string'
import { axiosInstance } from './axiosInstance'

export const findTrails = (payload: BookingFormValue): Promise<Trail[]> => {
  const queryParams = queryString.stringify(payload);
  return axiosInstance.get(`/api/trails?${queryParams}`).then((x) => x.data);
};
