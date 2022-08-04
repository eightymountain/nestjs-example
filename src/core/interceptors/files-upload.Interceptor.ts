import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import bytes from 'bytes';
import { FileConfigService } from '@config/file/config.service';
import { fromBuffer } from 'file-type';

// Decide if we want to do this. Means file needs to be loaded into memory
// --> memory usage. Would need to set memoryStorage to true.
async function verifyFileTypeByContent(buffer: Buffer, allowedMimeTypes: string[]) {
  const typeData = await fromBuffer(buffer);
  return typeData != null && allowedMimeTypes.includes(typeData?.mime);
}

function imageFileTypeFilter(allowedMimeTypes: string[]) {
  return function (
    req: any,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void
  ) {
    const allowedExtensions = allowedMimeTypes
      .map((s) => ' .' + s.split('/')[1])
      .toString()
      .trim();
    const wrongFileTypeError = new BadRequestException(
      `${allowedExtensions} 형식의 파일만 지원됩니다.`
    );

    // Check only based on extension
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(wrongFileTypeError, false);
    } // Check based on magic number
    else {
      // verifyFileTypeByContent(file.buffer, allowedMimeTypes).then(
      //   (fileTypeAllowed) => {
      //     if (!fileTypeAllowed) {
      //       return cb(wrongFileTypeError, false);
      //     }
      //     cb(null, true);
      //   },
      // );
      cb(null, true);
    }
  };
}

@Injectable()
export class FilesUploadInterceptor implements NestInterceptor {
  private readonly interceptor;

  constructor(private readonly fileConfigService: FileConfigService) {
    this.interceptor = new (FilesInterceptor('files', this.fileConfigService.maxUploadCount, {
      limits: { fileSize: bytes(this.fileConfigService.maxFileSize) },
      fileFilter: imageFileTypeFilter(this.fileConfigService.mimeWhitelist),
    }))();
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return this.interceptor.intercept(context, next);
  }
}
