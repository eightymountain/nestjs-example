import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { makeResponse } from '../types/response.types';
import { isObject } from '@nestjs/common/utils/shared.utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.error({
      ...exception,
      path: request.url,
    });

    const res = exception.getResponse();
    let msg;

    if (isObject(res)) {
      // todo:: typing
      // @ts-ignore
      msg = Array.isArray(res.message) ? res.message.pop() : res.message;
    } else {
      msg = res;
    }

    response.status(exception.getStatus()).json(
      makeResponse({
        message: msg,
      })
    );
  }
}
