import { UserTokenService } from './user-token.service';

export class UserTokenResolver {
  constructor(private readonly userTokenService: UserTokenService) {}
}
