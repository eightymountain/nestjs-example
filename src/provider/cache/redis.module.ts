import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from '@provider/cache/redis.service';
import { RedisConfigModule } from '@config/cache/redis/config.module';
import { RedisConfigService } from '@config/cache/redis/config.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [RedisConfigModule],
      useFactory: async (redisConfig: RedisConfigService) => ({
        store: redisStore,
        host: redisConfig.host,
        port: redisConfig.port,
        ttl: redisConfig.ttl,
        auth_pass: redisConfig.pwd,
      }),
      inject: [RedisConfigService],
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
