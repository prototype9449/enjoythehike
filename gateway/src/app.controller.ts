import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { waitForMs } from './utils';
import { BookTrail } from './types';
import { TrailPlace } from '../../src/types';

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
  async getWeekWeather(
    @Query('city') city: TrailPlace,
  ): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.getWeekWeather(city);
  }

  @Get('/bookings')
  async getBookings(): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.getBookings();
  }

  @Post('/trail')
  async bookTrail(@Body() body: BookTrail): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.bookTrail(body);
  }
}
