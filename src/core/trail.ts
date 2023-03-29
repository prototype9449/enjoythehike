import { axiosInstance } from "./axiosInstance";
import queryString from "query-string";
import { BookedTrail, BookedTrailResponse, BookingFormValue, Trail } from "../../gateway/src/types";

export type BookTrailPayload = {
  trailId: string;
  optionId: string
};

export const checkBookingStatus = (id: number): Promise<BookedTrailResponse> => {
  return axiosInstance.get(`/api/bookings/${id}/status`).then((x) => x.data);
}

export const getBookings = (): Promise<BookedTrail[]> => {
  return axiosInstance.get(`/api/bookings`).then((x) => x.data);
};

export const bookTrail = (payload: BookTrailPayload): Promise<BookedTrailResponse> => {
  return axiosInstance.post(`/api/bookings`, payload).then((x) => x.data);
};

export const findTrails = (payload: BookingFormValue): Promise<Trail[]> => {
  const queryParams = queryString.stringify(payload);
  return axiosInstance.get(`/api/trails?${queryParams}`).then((x) => x.data);
};
