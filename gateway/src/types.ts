export {};

export class BookTrail {
  trailId: string;
  optionId: string;

  constructor() {
    this.trailId = '';
    this.optionId = '';
  }
}

export type TrailStatus = 'booked' | 'waiting' | 'canceled';
export type BookedTrail = {
  id: number;
  trailId: string;
  optionId: string;
  name: string;
  status: TrailStatus;
  image: string;
  cost: number;
  date: string;
  taxi: {
    number: string;
    price: number;
    arrive: string;
  };
  lunch: {
    pick: string;
    dish: string;
    price: number;
  };
  hotel: {
    price: number;
    name: string;
    checkIn: string;
    checkOut: string;
    dateStart: string;
    dateEnd: string;
  };
};

export type TrailOption = {
  optionId: string;
  taxi: {
    type: string;
    price: number;
  };
  lunch: {
    price: number;
    dish: string;
  };
  hotel: {
    name: string;
    price: number;
    ratio: number;
  };
  date: string;
};

export type TrailBookingStatus = 'success' | 'in-process' | 'error';

export type SuccessStatusBookResponse = {
  status: 'success';
  trailName: string;
};

export type InProcessStatusBookResponse = {
  status: 'in-process';
};

export type ErrorStatusBookResponse = {
  status: 'error';
  message?: string;
};

export type StatusBookResponse =
  | ErrorStatusBookResponse
  | InProcessStatusBookResponse
  | SuccessStatusBookResponse;

export type SuccessBookResponse = {
  status: 'success';
  data: BookedTrail;
};

export type WaitingStatusBookResponse = {
  status: 'in-process';
  id: number;
};

export type ErrorBookResponse = {
  status: 'error';
  message?: string;
};

export type BookedTrailResponse =
  | ErrorBookResponse
  | WaitingStatusBookResponse
  | SuccessBookResponse;

export type TodayWeather = {
  place: TrailPlace;
  temperature: number;
  description: string;
  wind: number;
  humidity: number;
  feelsLike: number;
  forecast: string;
};

export type Trail = {
  trailId: string;
  name: string;
  distance: number;
  climb: number;
  rank: number;
  ratio: number;
  level: TrailLevel;
  image: string;
  priceMax: number;
  priceMin: number;
  hours: number;
  options: TrailOption[];
};

export type WeekDayWeather = {
  weekDay: string;
  temperature: {
    day: number;
    night: number;
  };
  icon: string;
  date: string;
};

export type BookingFormValue = {
  place: 'any' | TrailPlace;
  range: string;
  level: TrailLevel;
  mostlyPath: boolean;
};

export type TrailLevel = 'low' | 'medium' | 'hard';

export type TrailPlace = (typeof places)[number];

export const places = ['Limassol', 'Paphos', 'Troodos'] as const;

export {};
