import { registerMock } from "@exness-tech/mock-xhr-request/lazy";
import { axiosInstance } from "./axiosInstance";
import { WeekWeatherPayload } from "../WeatherWidget/WeekDayWeatherCard";
import { TodayWeather } from "../types";

registerMock(() => import("./mocks/weather").then((x) => x.nastyWeather));
export const getTodayWeather = (): Promise<TodayWeather[]> => {
  return axiosInstance.get("http://localhost:3002/weather/today?places=Limassol,Paphos,Troodos").then((x) => x.data);
};

export const getWeekWeather = (city: string): Promise<WeekWeatherPayload[]> => {
  return axiosInstance.get(`http://localhost:3002/weather/week?city=${city}`).then((x) => x.data);
};
