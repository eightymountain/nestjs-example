import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health(): string {
    return this.appService.health();
  }

  @Get('')
  @Render('index.ejs')
  home() {
    return { message: 'let`s party tonight!' };
  }
}
