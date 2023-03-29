import { axiosInstance } from "./axiosInstance";
import { BookedTrail, BookedTrailResponse } from "../../gateway/src/types";

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

export const bookHike = (payload: BookTrailPayload): Promise<BookedTrailResponse> => {
  return axiosInstance.post(`/api/bookings`, payload).then((x) => x.data);
};

