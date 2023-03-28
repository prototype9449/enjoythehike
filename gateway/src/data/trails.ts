import { addTrailToBookings } from './bookings';
import { BookedTrail, BookedTrailResponse, Trail, TrailStatus } from '../types';
import { BookTrail } from '../types';

export const trails: Trail[] = [
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
  {
    trailId: 'coralbay1',
    name: 'Coral Bay - Adonis Bath',
    climb: 301,
    ratio: 4.2,
    distance: 7.1,
    level: 'medium',
    rank: 63,
    image: '/coralbay1.jpg',
    priceMax: 118,
    priceMin: 60,
    hours: 2,
    options: [
      {
        optionId: 'coralbay1_1',
        date: '25 of July',
        hotel: {
          name: 'Avlida Hotel',
          price: 70,
          ratio: 4,
        },
        lunch: {
          price: 18,
          dish: 'Chowder with an ax',
        },
        taxi: {
          type: 'economy',
          price: 30,
        },
      },
      {
        optionId: 'coralbay1_2',
        hotel: {
          name: 'Nissiblu Beach Resort',
          price: 60,
          ratio: 3,
        },
        date: '29 of July',
        lunch: {
          price: 13,
          dish: 'Сottage cheese with fruits',
        },
        taxi: {
          type: 'comfort',
          price: 32,
        },
      },
    ],
  },
];

export const bookTrail = (trail: BookTrail): BookedTrailResponse => {
  const foundTrail = trails.find((x) => x.trailId === trail.trailId);

  const foundOption = foundTrail.options.find(
    (x) => x.optionId === trail.optionId,
  );

  // eslint-disable-next-line prefer-const
  let bookedTrail: BookedTrail;
  let status: TrailStatus = 'booked';
  if (trail.trailId === 'atalanti1') {
    status = 'waiting';
    setTimeout(() => {
      bookedTrail.status = 'booked';
    }, 5000);
  }

  bookedTrail = addTrailToBookings(foundTrail, foundOption, status);

  return status === 'waiting'
    ? {
        status: 'inProcess',
      }
    : {
        status: 'success',
        data: bookedTrail,
      };
};
