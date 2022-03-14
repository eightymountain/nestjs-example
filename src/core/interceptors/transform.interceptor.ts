import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { commonResponse } from '../types/response.types';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, commonResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<commonResponse> {
    return next.handle().pipe(
      map((data) => ({
        data: data ?? {},
        message: '',
      })),
    );
  }
}
