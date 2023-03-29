import { axiosInstance } from "./axiosInstance";
import { TodayWeather, TrailPlace } from "../../gateway/src/types";

export const getTodayWeather = async (places: TrailPlace[]): Promise<TodayWeather[]> => {
  const queryParams = `places=${places.join(",")}`;
  const resp = await axiosInstance.get(`/api/weather/today?${queryParams}`);

  return resp.data;
};
