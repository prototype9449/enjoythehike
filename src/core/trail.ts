import { axiosInstance } from './axiosInstance'
import queryString from 'query-string'
import { BookingFormValue } from '../BookingForm/types'


export const getTrails = (params: BookingFormValue) => {
  const queryParams = queryString.stringify(params)

  return axiosInstance.get(`/trail?${queryParams}`)
}

type BookTrailPayload = {
  trailId: string,
}

export const bookTrail = (payload: BookTrailPayload) => {
  return axiosInstance.post(`/trail`, payload)
}

export const findTrails =  (payload: BookingFormValue) => {
  const queryParams = queryString.stringify(payload)
  return axiosInstance.get(`/trail?${queryParams}`)
}
