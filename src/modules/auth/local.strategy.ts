import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CommonMessage } from 'src/common/messages';
import { CustomNotAuthorizedException } from '../../shared/exceptions/unauthorized.exception';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      logging: true,
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new CustomNotAuthorizedException(
        CommonMessage.getMessageLoginFail(),
      );
    }
    return user;
  }
}
