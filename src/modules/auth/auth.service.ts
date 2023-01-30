import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../users/dto/create-user-input.dto';
import { JwtConstants } from 'src/shared/services/jwt-constants';
import { CustomNotAuthorizedException } from 'src/shared/exceptions/unauthorized.exception';
import { CommonMessage } from 'src/common/messages';
import * as bcrypt from 'bcrypt';
import { UserTokenService } from '../user-tokens/user-token.service';
import * as moment from 'moment';
import { TokenTypes } from 'src/common/enums/token.enum';
import { CustomBadRequestException } from 'src/shared/exceptions/bad-request.exception';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userTokenService: UserTokenService,
    private jwtService: JwtService,
    private jwtConstants: JwtConstants,
  ) {}

  async login(user: User) {
    const userIns = await this.userService.findOneByEmail(user.email);
    const validToken = await this.userTokenService.findOneValidToken(
      userIns.id,
    );

    if (validToken) {
      throw new CustomBadRequestException(
        CommonMessage.getMessageLoggedAccount(),
      );
    }

    const tokens = await this.generateToken(user);
    return tokens;
  }

  async signup(createUserInput: CreateUserInput) {
    return this.userService.create({
      ...createUserInput,
    });
  }

  async generateToken(user: User, version = 0) {
    const jwtTokenExpireTime = moment()
      .add(1, 'days')
      .format('YYYY-MM-DD HH:mm:ss');
    const refreshTokenExpireTime = moment()
      .add(7, 'days')
      .format('YYYY-MM-DD HH:mm:ss');

    const jwtToken = this.jwtService.sign({
      email: user.email,
      sub: user.id,
      role: user.role,
    });

    const refreshJwtToken = this.jwtService.sign(
      {
        email: user.email,
        sub: user.id,
        role: user.role,
      },
      { expiresIn: '7d' },
    );
    const tokens = {
      user,
      access_token: jwtToken,
      access_token_expire_time: jwtTokenExpireTime,
      refresh_token: refreshJwtToken,
      refresh_token_expire_time: refreshTokenExpireTime,
    };
    await this.userTokenService.create({
      token: jwtToken,
      refreshToken: refreshJwtToken,
      expireAt: jwtTokenExpireTime,
      refreshExpireAt: refreshTokenExpireTime,
      version: version || 0,
      type: TokenTypes.JWT,
      description: '',
      userId: user.id,
    });

    return tokens;
  }

  async refreshToken(token: string) {
    const userData = this.jwtService.decode(token);
    if (!userData) {
      throw new CustomBadRequestException(
        CommonMessage.getMessageInvalidToken(),
      );
    }

    // register new token with version increasement
    const user = await this.userService.findOneByEmail(userData['email']);
    const existedToken = await this.userTokenService.findOneValidRefreshToken(
      userData?.sub,
      token,
    );
    const newToken = await this.generateToken(user, existedToken.version + 1);
    return newToken;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new CustomNotAuthorizedException(
        CommonMessage.getMessageLoginFail(),
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (user && validPassword) {
      user.password = '';
      return user;
    }

    return null;
  }
}
