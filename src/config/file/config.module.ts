import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileConfigService } from './config.service';
import fileConfig from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [fileConfig],
    }),
  ],
  providers: [ConfigService, FileConfigService],
  exports: [ConfigService, FileConfigService],
})
export class FileConfigModule {}
