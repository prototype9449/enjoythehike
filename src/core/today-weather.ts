import { registerMock } from "@exness-tech/mock-xhr-request";
import { axiosInstance } from "./axiosInstance";
import { TodayWeather, TrailPlace } from "../../gateway/src/types";

const missingWeatherData: TodayWeather[] = [
  {
    forecast: "clear-day",
    place: "Paphos",
    temperature: 15,
    description: "Phew, quite windy",
    wind: 51,
    humidity: 40,
    feelsLike: 22,
  },
];

registerMock("/api/weather/today:?search", "get", 200, missingWeatherData)
  .withName("windyDayInPaphos");

export const getTodayWeather = async (places: TrailPlace[]): Promise<TodayWeather[]> => {
  const queryParams = `places=${places.join(",")}`;
  const resp = await axiosInstance.get(`/api/weather/today?${queryParams}`);

  return resp.data;
};
