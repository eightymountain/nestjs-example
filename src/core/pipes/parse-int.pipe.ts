import {
  BadRequestException,
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {
    const val1 = Number(value);
    if (isNaN(val1)) {
      throw new BadRequestException('Validation failed. is Not Int');
    }
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed. is Not Int');
    }

    if (val1 - val !== 0) {
      throw new BadRequestException('Validation failed. is Not Int');
    }
    return val;
  }
}
