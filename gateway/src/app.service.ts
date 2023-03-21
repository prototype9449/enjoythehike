import { Injectable } from '@nestjs/common';
import { bookings } from './data/bookings';
import { bookTrail, trails } from './data/trails';
import { allWeekWeatherData, todayWeatherData } from './data/weather';
import { TrailPlace } from './types';
import { BookTrail } from './types';

@Injectable()
export class AppService {
  getTodayWeather(): Record<string, any> {
    return todayWeatherData;
  }

  getTrails(): any {
    return trails;
  }

  getWeekWeather(city: TrailPlace): any {
    return allWeekWeatherData[city];
  }

  getBookings(): any {
    return bookings.slice();
  }

  bookTrail(trailToBook: BookTrail): any {
    const resp = bookTrail(trailToBook);

    return resp;
  }
}
