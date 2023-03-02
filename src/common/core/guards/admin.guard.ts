import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { RoleTypes } from 'src/common/enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  private readonly logger = new Logger(AdminGuard.name);

  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().request;
    const Authorization = request.get('Authorization');
    this.logger.debug(
      `Checking for auth token AdminGuard on request body ${Authorization}`,
    );
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      const userData = this.jwtService.decode(token);
      if (userData['role'] === RoleTypes.ADMIN) {
        request.user = userData;
        return true;
      }
    }
    return false;
  }
}
