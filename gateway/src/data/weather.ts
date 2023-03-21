import { TrailPlace, WeekDayWeather } from '../../../src/types';

export const todayWeatherData = [
  {
    forecast: 'clear-day',
    place: 'Limassol',
    temperature: 20,
    description: 'Clear sky',
    wind: 12,
    humidity: 88,
    feelsLike: 22,
  },
  {
    forecast: 'thunderstorms',
    place: 'Paphos',
    temperature: 14,
    description: 'Cloudy',
    wind: 3,
    humidity: 78,
    feelsLike: 15,
  },
  {
    forecast: 'extreme',
    place: 'Troodos',
    temperature: 27,
    description: 'Hail',
    wind: 4,
    humidity: 60,
    feelsLike: 25,
  },
];

function generateRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const icons = [
  'clear-day',
  'extreme-day',
  'extreme-fog',
  'fog-day',
  'overcast-day',
  'partly-cloudy-day',
  'thunderstorms-day',
  'thunderstorms-day-rain',
];

const getTemp = () => generateRandomInteger(20, 30);
const getIcon = () => icons[generateRandomInteger(0, icons.length - 1)];

const getData = () => [
  {
    weekDay: 'Monday',
    date: '17.02',
    temperature: { day: getTemp(), night: getTemp() },
    icon: getIcon(),
  },
  {
    weekDay: 'Tuesday',
    date: '18.02',
    temperature: { day: getTemp(), night: getTemp() },
    icon: getIcon(),
  },
  {
    weekDay: 'Wednesday',
    date: '19.02',
    temperature: { day: getTemp(), night: getTemp() },
    icon: getIcon(),
  },
  {
    weekDay: 'Thursday',
    date: '20.02',
    temperature: { day: getTemp(), night: getTemp() },
    icon: getIcon(),
  },
  {
    weekDay: 'Friday',
    date: '21.02',
    temperature: { day: getTemp(), night: getTemp() },
    icon: getIcon(),
  },
  {
    weekDay: 'Saturday',
    date: '22.02',
    temperature: { day: getTemp(), night: getTemp() },
    icon: getIcon(),
  },
  {
    weekDay: 'Sunday',
    date: '23.02',
    temperature: { day: getTemp(), night: getTemp() },
    icon: getIcon(),
  },
];

export const allWeekWeatherData: Record<TrailPlace, WeekDayWeather[]> = {
  Troodos: getData(),
  Paphos: getData(),
  Limassol: getData(),
};
