import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(logupData: RegisterDto) {
    logupData.password = await bcrypt.hash(logupData.password, 10);

    const userInDB = await this.userRepository.findByCondition({
      email: logupData.email,
    });

    if (userInDB) {
      throw new HttpException('User already existed!', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.create(logupData);
  }

  async login(loginData: LoginDto) {
    const user = await this.userRepository.findByCondition({
      email: loginData.email,
    });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.UNAUTHORIZED);
    }

    if (!bcrypt.compareSync(loginData.password, user.password)) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.userRepository.findByCondition({ email: email });
  }
}
