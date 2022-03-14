import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpRequestInterceptor } from './interceptors/http.request.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: HttpRequestInterceptor },
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
