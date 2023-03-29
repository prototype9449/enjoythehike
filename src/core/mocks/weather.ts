import { RegisterMockPayload } from '@exness-tech/mock-xhr-request/lazy'
import { TodayWeather } from '../../../gateway/src/types'

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

export const missingWeather: RegisterMockPayload = {
  status: 200,
  name: "windyDayInPaphos",
  method: "get",
  urlOrRegex: "/api/weather/today:?search",
  data: missingWeatherData,
};

const nastyWeatherData: TodayWeather[] = [
  {
    forecast: "extreme-day-hail",
    place: "Limassol",
    temperature: 20,
    description: "Hail",
    wind: 30,
    humidity: 80,
    feelsLike: 15,
  },
  {
    forecast: "thunderstorms",
    place: "Paphos",
    temperature: 26,
    description: "Thunderstorms",
    wind: 15,
    humidity: 76,
    feelsLike: 24,
  },
  {
    forecast: "extreme-rain",
    place: "Troodos",
    temperature: 15,
    description: "Heavy rain",
    wind: 4,
    humidity: 90,
    feelsLike: 11,
  },
];

export const nastyWeather: RegisterMockPayload = {
  status: 200,
  name: "nastyWeather",
  method: "get",
  urlOrRegex: "/api/weather/today:?search",
  data: nastyWeatherData,
};
