import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomBadRequestException extends HttpException {
  description: string;
  constructor(message = 'Bad request', status = HttpStatus.BAD_REQUEST) {
    super(message, status);
  }
}
