import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  private get<T>(key: string) {
    const value = this.configService.get<T>(key);
    if (value == null) {
      throw new InternalServerErrorException('redis env config error');
    }
    return value;
  }

  get host(): string {
    return this.get<string>('redis.REDIS_HOST');
  }
  get port(): number {
    return Number(this.get<number>('redis.REDIS_PORT'));
  }
  get ttl(): number {
    return Number(this.get<number>('redis.REDIS_TTL'));
  }
  get pwd(): string {
    return this.get<string>('redis.REDIS_PWD');
  }
}
