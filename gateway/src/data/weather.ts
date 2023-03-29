import { TodayWeather, TrailPlace, WeekDayWeather } from '../types';

export const todayWeatherData: TodayWeather[] = [
  {
    forecast: 'clear-day',
    place: 'Limassol',
    temperature: 17,
    description: 'Clear sky',
    wind: 21,
    humidity: 38,
    feelsLike: 16,
  },
  {
    forecast: 'partly-cloudy-day',
    place: 'Paphos',
    temperature: 14,
    description: 'Cloudy',
    wind: 35,
    humidity: 40,
    feelsLike: 14,
  },
  {
    forecast: 'overcast-day-snow',
    place: 'Troodos',
    temperature: 8,
    description: 'Cloudy and snow',
    wind: 24,
    humidity: 43,
    feelsLike: 4,
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

const limassolWeather = [
  {
    weekDay: 'Thursday',
    date: '30.04',
    temperature: { day: 16, night: 7 },
    icon: 'clear-day',
  },
  {
    weekDay: 'Friday',
    date: '31.04',
    temperature: { day: 19, night: 10 },
    icon: 'partly-cloudy-day',
  },
  {
    weekDay: 'Saturday',
    date: '1.05',
    temperature: { day: 18, night: 13 },
    icon: 'partly-cloudy-day',
  },
  {
    weekDay: 'Sunday',
    date: '2.05',
    temperature: { day: 19, night: 12 },
    icon: 'partly-cloudy-day-fog',
  },
  {
    weekDay: 'Monday',
    date: '3.05',
    temperature: { day: 20, night: 15 },
    icon: 'partly-cloudy-day',
  },
  {
    weekDay: 'Tuesday',
    date: '4.05',
    temperature: { day: 21, night: 14 },
    icon: 'clear-day',
  },
  {
    weekDay: 'Wednesday',
    date: '5.05',
    temperature: { day: 19, night: 13 },
    icon: 'partly-cloudy-day',
  },
];

const paphosWeather = [
  {
    weekDay: 'Thursday',
    date: '30.04',
    temperature: { day: 14, night: 8 },
    icon: 'clear-day',
  },
  {
    weekDay: 'Friday',
    date: '31.04',
    temperature: { day: 16, night: 12 },
    icon: 'clear-day',
  },
  {
    weekDay: 'Saturday',
    date: '1.05',
    temperature: { day: 18, night: 13 },
    icon: 'partly-cloudy-day',
  },
  {
    weekDay: 'Sunday',
    date: '2.05',
    temperature: { day: 18, night: 11 },
    icon: 'partly-cloudy-day-fog',
  },
  {
    weekDay: 'Monday',
    date: '3.05',
    temperature: { day: 20, night: 15 },
    icon: 'partly-cloudy-day',
  },
  {
    weekDay: 'Tuesday',
    date: '4.05',
    temperature: { day: 20, night: 14 },
    icon: 'clear-day',
  },
  {
    weekDay: 'Wednesday',
    date: '5.05',
    temperature: { day: 18, night: 14 },
    icon: 'partly-cloudy-day-rain',
  },
];

const trodosWeather = [
  {
    weekDay: 'Thursday',
    date: '30.04',
    temperature: { day: 8, night: 0 },
    icon: 'partly-cloudy-day-snow',
  },
  {
    weekDay: 'Friday',
    date: '31.04',
    temperature: { day: 4, night: -4 },
    icon: 'extreme-snow',
  },
  {
    weekDay: 'Saturday',
    date: '1.05',
    temperature: { day: 5, night: -6 },
    icon: 'clear-day',
  },
  {
    weekDay: 'Sunday',
    date: '2.05',
    temperature: { day: 7, night: -4 },
    icon: 'clear-day',
  },
  {
    weekDay: 'Monday',
    date: '3.05',
    temperature: { day: 10, night: -1 },
    icon: 'extreme-day-snow',
  },
  {
    weekDay: 'Tuesday',
    date: '4.05',
    temperature: { day: 13, night: 0 },
    icon: 'clear-day',
  },
  {
    weekDay: 'Wednesday',
    date: '5.05',
    temperature: { day: 16, night: 3 },
    icon: 'overcast-day-sleet',
  },
];

// const getData = () => [
//   {
//     weekDay: 'Monday',
//     date: '17.02',
//     temperature: { day: getTemp(), night: getTemp() },
//     icon: getIcon(),
//   },
//   {
//     weekDay: 'Tuesday',
//     date: '18.02',
//     temperature: { day: getTemp(), night: getTemp() },
//     icon: getIcon(),
//   },
//   {
//     weekDay: 'Wednesday',
//     date: '19.02',
//     temperature: { day: getTemp(), night: getTemp() },
//     icon: getIcon(),
//   },
//   {
//     weekDay: 'Thursday',
//     date: '20.02',
//     temperature: { day: getTemp(), night: getTemp() },
//     icon: getIcon(),
//   },
//   {
//     weekDay: 'Friday',
//     date: '21.02',
//     temperature: { day: getTemp(), night: getTemp() },
//     icon: getIcon(),
//   },
//   {
//     weekDay: 'Saturday',
//     date: '22.02',
//     temperature: { day: getTemp(), night: getTemp() },
//     icon: getIcon(),
//   },
//   {
//     weekDay: 'Sunday',
//     date: '23.02',
//     temperature: { day: getTemp(), night: getTemp() },
//     icon: getIcon(),
//   },
// ];

export const allWeekWeatherData: Record<TrailPlace, WeekDayWeather[]> = {
  Troodos: trodosWeather,
  Paphos: paphosWeather,
  Limassol: limassolWeather,
};
