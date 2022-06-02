import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
  constructor(errors: ValidationError[], description?: string) {
    const errObj = errors.pop()?.constraints;
    const errMsg = errObj ? errObj[Object.keys(errObj)[0]] : '요청값이 잘못되었습니다.';

    super(errMsg, description);
  }
}
