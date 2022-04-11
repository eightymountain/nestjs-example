import { makeResponse } from '@core/types/response.types';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorMsg;
    try {
      errorMsg = exception;
    } catch (e) {
      errorMsg = 'INTERNAL_SERVER_ERROR';
    }

    console.error(errorMsg);

    httpAdapter.reply(
      ctx.getResponse(),
      makeResponse({
        message: '서비스에 문제가 발생하였습니다. 오류가 지속되면 관리자에게 문의 바랍니다.',
      }),
      httpStatus
    );
  }
}
