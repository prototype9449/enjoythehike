import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { waitForMs } from './utils';

@Controller('weather')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/today')
  async getWeather(): Promise<Record<string, any>> {
    await waitForMs(1000);
    return this.appService.getTodayWeather();
  }

  @Get('/trail')
  async getTrails(): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.getTrails();
  }

  @Get('/week')
  async getWeekWeather(): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.getWeekWeather();
  }

  @Get('/bookings')
  async getBookings(): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.getBookings();
  }
}
