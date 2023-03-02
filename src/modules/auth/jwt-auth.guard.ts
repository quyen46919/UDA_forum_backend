import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { CommonMessage } from 'src/common/messages';
import { CustomNotAuthorizedException } from 'src/shared/exceptions/unauthorized.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().request;
    const Authorization = request.get('Authorization');

    if (!Authorization) {
      throw new CustomNotAuthorizedException(
        CommonMessage.getMessageLoginFail(),
      );
    } else {
      const token = Authorization.replace('Bearer ', '');
      const userData = this.jwtService.decode(token);
      if (!userData) {
        throw new CustomNotAuthorizedException(
          CommonMessage.getMessageLoginFail(),
        );
      }
      request.user = userData;
    }

    return true;
  }
}
