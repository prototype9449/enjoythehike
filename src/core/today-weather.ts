import { registerMock } from "@exness-tech/mock-xhr-request/lazy";
import { axiosInstance } from "./axiosInstance";
import { TodayWeather, TrailPlace } from "../../gateway/src/types";

registerMock(() => import("./mocks/weather").then((x) => x.nastyWeather));
registerMock(() => import("./mocks/weather").then((x) => x.missingWeather));

export const getTodayWeather = async (places: TrailPlace[]): Promise<TodayWeather[]> => {
  const queryParams = `places=${places.join(",")}`;
  const resp = await axiosInstance.get(`/api/weather/today?${queryParams}`);

  return resp.data;
};
