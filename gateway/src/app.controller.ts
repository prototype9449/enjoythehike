import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { waitForMs } from './utils';

export class BookTrail {
  trailId: string;
  optionId: string;
}

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

  @Post('/trail')
  async bookTrail(@Body() body: BookTrail): Promise<Record<string, any>> {
    await waitForMs(1500);
    return this.appService.bookTrail(body);
  }
}
