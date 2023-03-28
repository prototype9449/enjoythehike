import { axiosInstance } from "./axiosInstance";
import queryString from "query-string";
import { BookedTrail, BookedTrailResponse, BookingFormValue, Trail } from "../../gateway/src/types";

export type BookTrailPayload = {
  trailId: string;
  optionId: string
};

const baseUrl = "http://localhost:3002/api"

export const checkBookingStatus = (id: number): Promise<BookedTrailResponse> => {
  return axiosInstance.get(`${baseUrl}/bookings/${id}/status`).then((x) => x.data);
}

export const getBookings = (): Promise<BookedTrail[]> => {
  return axiosInstance.get(`${baseUrl}/bookings`).then((x) => x.data);
};

export const bookTrail = (payload: BookTrailPayload): Promise<BookedTrailResponse> => {
  return axiosInstance.post(`${baseUrl}/bookings`, payload).then((x) => x.data);
};

export const findTrails = (payload: BookingFormValue): Promise<Trail[]> => {
  const queryParams = queryString.stringify(payload);
  return axiosInstance.get(`${baseUrl}/trails?${queryParams}`).then((x) => x.data);
};
