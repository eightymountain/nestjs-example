import { Module } from '@nestjs/common';
import { DataBaseModule } from 'database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from '@core/core.module';

@Module({
  imports: [DataBaseModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
