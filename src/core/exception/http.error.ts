import { HttpException } from '@nestjs/common';

export default class HttpError extends HttpException {
  public code: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message, status);
    this.code = status;
    this.message = message;
  }
}
