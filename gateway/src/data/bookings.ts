import {
  BookedTrail,
  BookedTrailResponse,
  BookTrail,
  InProcessStatusBookResponse,
  StatusBookResponse,
  Trail,
  TrailBookingStatus,
  TrailOption,
  TrailStatus,
} from '../types';
import { generateRandomInteger } from '../utils';

let globalBookId = 1000;
const generateId = (): number => {
  globalBookId = globalBookId + 1;
  return globalBookId;
};

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

const makeCost = (books: BookedTrail[]): BookedTrail[] => {
  books.forEach((x) => {
    x.cost = x.taxi.price + x.lunch.price + x.hotel.price;
  });
  return books;
};

// export const bookings: BookedTrail[] = makeCost([
//   {
//     id: 999,
//     cost: 0,
//     trailId: 'atlanti1',
//     optionId: 'atlanti1_2',
//     status: 'booked',
//     name: 'Atalanti Nature Troodos',
//     image: '/atalanti.jpg',
//     date: '25 of July',
//     taxi: getTaxi(),
//     lunch: getLunch(),
//     hotel: getHotel('25 of July'),
//   },
// ]);

export const bookings: BookedTrail[] = [];

const getTaxiNumber = () => {
  const numbers = ['PHK123', 'BAC909', 'THO456', 'TEC093'];
  const i = generateRandomInteger(0, numbers.length - 1);
  return numbers[i];
};

const getPickupTime = () => {
  const numbers = ['6:30', '7:15', '8:00', '8:30', '9:00', '9:30'];
  const i = generateRandomInteger(0, numbers.length - 1);
  return numbers[i];
};

const getLunchTime = () => {
  const numbers = ['10:00', '10:15', '10:45', '11:00', '11:30', '11:45'];
  const i = generateRandomInteger(0, numbers.length - 1);
  return numbers[i];
};

export const addTrailToBookings = (
  trail: Trail,
  option: TrailOption,
  status: TrailStatus,
): BookedTrail => {
  const cost = option.hotel.price + option.taxi.price + option.lunch.price;

  const result: BookedTrail = {
    id: generateId(),
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
      pick: getLunchTime(),
    },
    taxi: {
      number: getTaxiNumber(),
      arrive: getPickupTime(),
      price: option.taxi.price,
    },
  };

  bookings.unshift(result);

  return result;
};

export const checkBookingStatus = (id: number): StatusBookResponse => {
  const booking = bookings.find((x) => x.id === id);
  const bookStatus: TrailBookingStatus =
    booking.status === 'waiting' ? 'in-process' : 'success';

  if (bookStatus === 'success') {
    return {
      status: bookStatus,
      trailName: booking.name,
    };
  }

  return {
    status: bookStatus,
  } as InProcessStatusBookResponse;
};
