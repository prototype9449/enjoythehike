import { RegisterMockPayload } from "@exness-tech/mock-xhr-request/lazy/types";
import { TodayWeather } from "../../../gateway/src/types";

const nastyWeatherData: TodayWeather[] = [
  {
    forecast: "clear-day",
    place: "Limassol",
    temperature: 20,
    description: "Clear sky 1111",
    wind: 12,
    humidity: 88,
    feelsLike: 22,
  },
  {
    forecast: "thunderstorms",
    place: "Paphos",
    temperature: 14,
    description: "Cloudy 111",
    wind: 3,
    humidity: 78,
    feelsLike: 15,
  },
  {
    forecast: "extreme",
    place: "Troodos",
    temperature: 100,
    description: "Hail 111",
    wind: 4,
    humidity: 60,
    feelsLike: 25,
  },
];

export const nastyWeather: RegisterMockPayload = {
  status: 200,
  name: "nastyWeather",
  method: "get",
  urlOrRegex: "/api/weather/today:?search",
  data: nastyWeatherData,
};


const missingWeatherData: TodayWeather[] = [
  {
    forecast: "clear-day",
    place: "Paphos",
    temperature: 20,
    description: "Clear sky 1111",
    wind: 12,
    humidity: 88,
    feelsLike: 22,
  }
]

export const missingWeather: RegisterMockPayload = {
  status: 200,
  name: "missingWeather",
  method: "get",
  urlOrRegex: "/api/weather/today:?search",
  data: missingWeatherData,
};
