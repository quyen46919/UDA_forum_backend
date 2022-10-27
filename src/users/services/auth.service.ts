import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from '../dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.register(registerDto);

    const token = this.createToken(registerDto);
    return {
      user,
      ...token,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.login(loginDto);
    const token = this.createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async checkValidEmail(email) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private createToken({ email }) {
    const accessToken = this.jwtService.sign({ email });
    return {
      expireIn: process.env.EXPIRESIN,
      accessToken,
    };
  }
}
