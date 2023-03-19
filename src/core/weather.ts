import { axiosInstance } from './axiosInstance'

export const getTodayWeather = () => {
  return axiosInstance.get('/weather/today')
}

export const getWeekWeather = (city: string) => {
  return axiosInstance.get(`/weather/week?city=${city}`)
}
