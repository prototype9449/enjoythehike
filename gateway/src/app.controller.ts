import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { waitForMs } from './utils';
import { BookTrail } from './types';
import { TrailPlace } from './types';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/weather/today')
  async getWeather(): Promise<Record<string, any>> {
    await waitForMs(1000);
    return this.appService.getTodayWeather();
  }

  @Get('/weather/week')
  async getWeekWeather(
    @Query('city') city: TrailPlace,
  ): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.getWeekWeather(city);
  }

  @Get('/trails')
  async getTrails(): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.getTrails();
  }

  @Get('/bookings/:id/status')
  async getTrailStatus(@Param('id', new ParseIntPipe()) id: number): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.checkTrailStatus(id);
  }

  @Get('/bookings')
  async getBookings(): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.getBookings();
  }

  @Post('/bookings')
  async bookTrail(@Body() body: BookTrail): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.bookTrail(body);
  }
}
