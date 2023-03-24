import { axiosInstance } from "./axiosInstance";
import queryString from "query-string";
import { BookedTrail, BookedTrailResponse, BookingFormValue, Trail } from '../types'

export type BookTrailPayload = {
  trailId: string;
  optionId: string
};



export const bookTrail = (payload: BookTrailPayload): Promise<BookedTrailResponse> => {
  return axiosInstance.post(`http://localhost:3002/weather/trail`, payload).then((x) => x.data);
};

export const getBookings = (): Promise<BookedTrail[]> => {
  return axiosInstance.get("http://localhost:3002/weather/bookings").then((x) => x.data);
};

export const findTrails = (payload: BookingFormValue): Promise<Trail[]> => {
  const queryParams = queryString.stringify(payload);
  return axiosInstance.get(`http://localhost:3002/weather/trail?${queryParams}`).then((x) => x.data);
};
