import { Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // file upload
  // @Post('file')
  // @UseInterceptors(FilesUploadInterceptor)
  // uploadMany(@UploadedFiles() files: Array<Express.Multer.File>) {
  // }

  @Get('health')
  heathCheck(): string {
    return this.appService.health();
  }

  @Get('')
  @Render('index.ejs')
  home() {
    return { message: 'let`s party tonight!' };
  }
}
