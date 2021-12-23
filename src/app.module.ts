import { Module } from '@nestjs/common';
import { DataBaseModule } from 'database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [DataBaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
