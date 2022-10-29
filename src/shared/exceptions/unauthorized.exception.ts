import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomNotAuthorizedException extends HttpException {
  description: string;
  constructor(message = 'Bad request', status = HttpStatus.UNAUTHORIZED) {
    super(message, status);
  }
}
