import { registerMock } from "@exness-tech/mock-xhr-request/lazy";
import { axiosInstance } from "./axiosInstance";
import { WeekWeatherPayload } from "../WeatherWidget/WeekDayWeatherCard";
import { TodayWeather, TrailPlace } from "../../gateway/src/types";

registerMock('/api/weather/today:?search', 'get', 403, { message: 'No weather for you'}).withName('rudeResponse')
registerMock(() => import("./mocks/weather").then((x) => x.nastyWeather));
registerMock(() => import("./mocks/weather").then((x) => x.missingWeather));
export const getTodayWeather = (places: TrailPlace[]): Promise<TodayWeather[]> => {
  const queryParams = `places=${places.join(",")}`;

  return axiosInstance.get(`/api/weather/today?${queryParams}`).then((x) => x.data);
};

export const getWeekWeather = (city: string): Promise<WeekWeatherPayload[]> => {
  return axiosInstance.get(`/api/weather/week?city=${city}`).then((x) => x.data);
};
