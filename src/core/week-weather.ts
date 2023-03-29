import { WeekWeatherPayload } from '../WeatherWidget/WeekDayWeatherCard'
import { axiosInstance } from './axiosInstance'

export const getWeekWeather = (city: string): Promise<WeekWeatherPayload[]> => {
  return axiosInstance.get(`/api/weather/week?city=${city}`).then((x) => x.data);
};
