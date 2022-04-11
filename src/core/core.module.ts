import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpRequestInterceptor } from './interceptors/http.request.interceptor';
import { TransformInterceptor } from '@core/interceptors/transform.interceptor';
import { LoggerMiddleware } from '@core/middleware/logger.middleware';
import { HttpExceptionFilter } from '@core/filters/http.exception.filter';
import { ValidationPipe } from '@core/pipes/validation.pipe';
import { AllExceptionsFilter } from '@core/filters/all.exception.filter';

@Module({
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_PIPE, useClass: ValidationPipe },
    // { provide: APP_INTERCEPTOR, useClass: HttpRequestInterceptor },
  ],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
