import { Injectable } from '@nestjs/common';
import { BookTrail } from './app.controller';

const data = [
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
    temperature: 20,
    description: 'Clear sky',
    wind: 12,
    humidity: 88,
    feelsLike: 22,
  },
  {
    forecast: 'extreme',
    place: 'Troodos',
    temperature: 20,
    description: 'Clear sky',
    wind: 12,
    humidity: 88,
    feelsLike: 22,
  },
];

const trails = [
  {
    trailId: 'atalanti1',
    name: 'Atalanti Nature Troodos',
    climb: 133,
    ratio: 4.7,
    distance: 13.92,
    level: 'hard',
    rank: 85,
    image: '/atalanti.jpeg',
    priceMax: 140,
    priceMin: 90,
    hours: 9,
    options: [
      {
        optionId: 'atlanti1_1',
        hotel: {
          name: 'Resort hotel super',
          price: 80,
          ratio: 4.6,
        },
        date: '25 of July',
        lunch: {
          price: 12,
          dish: 'Rice with salmon',
        },
        taxi: {
          type: 'comfort',
          price: 40,
        },
      },
      {
        optionId: 'atlanti1_2',
        hotel: {
          name: 'Resort hotel super',
          price: 90,
          ratio: 3,
        },
        date: '29 of July',
        lunch: {
          price: 10,
          dish: 'Beef with makaroni',
        },
        taxi: {
          type: 'economy',
          price: 20,
        },
      },
      {
        optionId: 'atlanti1_3',
        hotel: {
          name: 'Square hotel beach',
          price: 70,
          ratio: 4,
        },
        date: '27 of July',
        lunch: {
          price: 10,
          dish: 'Big fried pie',
        },
        taxi: {
          type: 'comfort',
          price: 30,
        },
      },
    ],
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

const bookings = [
  {
    trailId: 'atlanti1',
    optionId: 'atlanti1_2',
    status: 'booked',
    name: 'Atalanti Nature Troodos',
    image: '/atalanti.jpeg',
    cost: 152,
    date: '25 of July',
    taxi: {
      number: 'NPK123',
      arrive: '9:31',
      price: 40,
    },
    lunch: {
      pick: '11:20',
      dish: 'Rice with salmon',
      price: 12,
    },
    hotel: {
      price: 100,
      name: 'Resort hotel super',
      checkIn: '14:00',
      checkOut: '12:00',
      dateStart: '25 of July',
      dateEnd: '26 of July',
    },
  },
  {
    trailId: 'atlanti1',
    optionId: 'atlanti1_3',
    status: 'waiting',
    name: 'Atalanti Nature Troodos',
    image: '/atalanti.jpeg',
    cost: 152,
    date: '21 of July',
    taxi: {
      number: 'NPK123',
      arrive: '9:31',
      price: 40,
    },
    lunch: {
      pick: '11:20',
      dish: 'Rice with salmon',
      price: 12,
    },
    hotel: {
      price: 100,
      name: 'Resort hotel super',
      checkIn: '14:00',
      checkOut: '12:00',
      dateStart: '25 of July',
      dateEnd: '26 of July',
    },
  },
];

@Injectable()
export class AppService {
  getTodayWeather(): Record<string, any> {
    return data;
  }

  getTrails(): any {
    return trails;
  }

  getWeekWeather(): any {
    return getData();
  }

  getBookings(): any {
    return bookings;
  }

  bookTrail(trailToBook: BookTrail): any {
    return {
      status: 'success',
    };
  }
}
