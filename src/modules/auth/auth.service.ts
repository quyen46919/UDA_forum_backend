import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../users/dto/create-user-input.dto';
import { JwtConstants } from 'src/shared/services/jwt-constants';
import { CustomNotAuthorizedException } from 'src/shared/exceptions/unauthorized.exception';
import { CommonMessage } from 'src/common/messages';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private jwtConstants: JwtConstants,
  ) {}

  async login(user: User) {
    return {
      user,
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
      }),
    };
  }

  async signup(createUserInput: CreateUserInput) {
    console.log('auth service');
    return this.userService.create({
      ...createUserInput,
    });
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
