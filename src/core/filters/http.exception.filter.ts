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

    const res = exception.getResponse() as
      | string
      | { success?: boolean; message: string | string[]; error?: string };

    let msg;

    if (isObject(res)) {
      msg = Array.isArray(res.message) ? res.message.pop() : res.message;
    } else {
      msg = res;
    }

    response.status(exception.getStatus()).send(
      makeResponse({
        message: msg,
      })
    );
  }
}
