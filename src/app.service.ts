import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health(): string {
    return 'let`s do that shit!';
  }
}
