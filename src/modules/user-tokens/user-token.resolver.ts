import { Resolver } from '@nestjs/graphql';
import { UserToken } from 'src/entities/user-token.entity';
import { UserTokenService } from './user-token.service';

@Resolver(() => UserToken)
export class UserTokenResolver {
  constructor(private readonly userTokenService: UserTokenService) {}
}
