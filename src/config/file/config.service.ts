import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileConfigService {
  constructor(private configService: ConfigService) {}

  private get<T>(key: string) {
    const value = this.configService.get<T>(key);
    if (value == null) {
      throw new InternalServerErrorException('invalid file config env');
    }
    return value;
  }

  get maxUploadCount() {
    return this.get<number>('file.MAX_UPLOAD_COUNT');
  }
  get maxFileSize() {
    return this.get<string>('file.MAX_FILE_SIZE');
  }
  get mimeWhitelist() {
    return this.get<string[]>('file.MIME_WHITELIST');
  }
}
