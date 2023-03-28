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
    image: '/atalanti.jpg',
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
        date: '31 of March',
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
        date: '1 of April',
        lunch: {
          price: 10,
          dish: 'Beef with pasta',
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
        date: '31 of March',
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
        date: '2 of April',
        hotel: {
          name: 'Avlida Hotel',
          price: 70,
          ratio: 4,
        },
        lunch: {
          price: 18,
          dish: 'Ax porridge',
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
        date: '1 of April',
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
  {
    trailId: 'peiya1',
    name: 'Akamas from Neo Chorio',
    climb: 612,
    ratio: 4.3,
    distance: 19,
    level: 'medium',
    rank: 62,
    image: '/peiya1.jpg',
    priceMax: 152,
    priceMin: 110,
    hours: 7,
    options: [
      {
        optionId: 'peiya1_1',
        date: '3 of April',
        hotel: {
          name: 'Four Seasons Hotel',
          price: 80,
          ratio: 4,
        },
        lunch: {
          price: 22,
          dish: 'Potatoes with pork',
        },
        taxi: {
          type: 'comfort',
          price: 50,
        },
      },
      {
        optionId: 'peiya1_2',
        hotel: {
          name: 'Lordos Beach Hotel',
          price: 60,
          ratio: 3,
        },
        date: '31 of March',
        lunch: {
          price: 20,
          dish: 'Pancakes with caviar',
        },
        taxi: {
          type: 'comfort',
          price: 30,
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
        status: 'in-process',
        id: bookedTrail.id,
      }
    : {
        status: 'success',
        data: bookedTrail,
      };
};
