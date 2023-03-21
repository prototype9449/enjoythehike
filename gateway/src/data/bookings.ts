import {
  BookedTrail,
  Trail,
  TrailOption,
  TrailStatus,
} from '../types';

export const getHotel = (date: string) => {
  return {
    price: 90,
    name: 'Resort super',
    checkIn: '14:00',
    checkOut: '12:00',
    dateStart: date,
    dateEnd: date,
  };
};

export const getTaxi = () => {
  return {
    number: 'ATO456',
    arrive: '10:31',
    price: 39,
  };
};

export const getLunch = () => {
  return {
    pick: '12:00',
    dish: 'Rice with salmon',
    price: 10,
  };
};

const makeCost = (books) => {
  books.forEach((x) => {
    x.cost = x.taxi.price + x.lunch.price + x.hotel.price;
  });
  return books;
};

export const bookings: BookedTrail[] = makeCost([
  {
    trailId: 'atlanti1',
    optionId: 'atlanti1_2',
    status: 'booked',
    name: 'Atalanti Nature Troodos',
    image: '/atalanti.jpeg',
    date: '25 of July',
    taxi: getTaxi(),
    lunch: getLunch(),
    hotel: getHotel('25 of July'),
  },
  {
    trailId: 'atlanti1',
    optionId: 'atlanti1_3',
    status: 'waiting',
    name: 'Atalanti Nature Troodos',
    image: '/atalanti.jpeg',
    date: '24 of July',
    taxi: getTaxi(),
    lunch: getLunch(),
    hotel: getHotel('24 of July'),
  },
]);

export const addTrailToBookings = (
  trail: Trail,
  option: TrailOption,
  status: TrailStatus,
): BookedTrail => {
  const cost = option.hotel.price + option.taxi.price + option.lunch.price;

  const result: BookedTrail = {
    trailId: trail.trailId,
    optionId: option.optionId,
    status,
    date: option.date,
    image: trail.image,
    name: trail.name,
    cost,
    hotel: {
      checkIn: '14:00',
      checkOut: '12:00',
      dateStart: option.date,
      dateEnd: option.date,
      name: option.hotel.name,
      price: option.hotel.price,
    },
    lunch: {
      dish: option.lunch.dish,
      price: option.lunch.price,
      pick: '9:30',
    },
    taxi: {
      number: 'PHK123',
      arrive: '9:00',
      price: option.taxi.price,
    },
  };

  bookings.unshift(result);

  return result;
};
