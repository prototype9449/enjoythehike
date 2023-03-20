import { axiosInstance } from "./axiosInstance";
import queryString from "query-string";
import { BookingFormValue } from "../BookingForm/types";
import { Trail } from "../Trails/Trails";
import { BookedTrail } from "../Bookings/Bookings";

type BookTrailPayload = {
  trailId: string;
};

export const bookTrail = (payload: BookTrailPayload) => {
  return axiosInstance.post(`http://localhost:3002/weather/trail`, payload).then((x) => x.data);
};

export const getBookings = (): Promise<BookedTrail[]> => {
  return axiosInstance.get("http://localhost:3002/weather/bookings").then((x) => x.data);
};

export const findTrails = (payload: BookingFormValue): Promise<Trail[]> => {
  const queryParams = queryString.stringify(payload);
  return axiosInstance.get(`http://localhost:3002/weather/trail?${queryParams}`).then((x) => x.data);
};
