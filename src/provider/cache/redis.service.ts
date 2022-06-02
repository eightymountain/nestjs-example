import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { RedisCache } from '@core/types/redis.types';
import { RedisClient } from 'redis';

@Injectable()
export class RedisService {
  private redisClient: RedisClient;
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: RedisCache) {
    this.redisClient = this.cacheManager.store.getClient();
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    await this.cacheManager.set(key, value, ttl ? { ttl } : undefined);

    return true;
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.cacheManager.get<T>(key);
  }

  async del(key: string) {
    return this.cacheManager.del(key);
  }

  async incr(key: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      this.redisClient.incr(key, (err, reply) => {
        if (err) {
          console.error(err);
          // throw new BadRequestException();
        }
        resolve(reply);
      });
    });
  }
}
