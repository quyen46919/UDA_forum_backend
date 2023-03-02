import { InjectRepository } from '@nestjs/typeorm';
import { CommonMessage } from 'src/common/messages';
import { User } from 'src/entities/user.entity';
import { CustomBadRequestException } from 'src/shared/exceptions/bad-request.exception';
import { getConnection, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user-input.dto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtConstants } from 'src/shared/services/jwt-constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtConstants: JwtConstants,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const user = await this.findOneByEmail(createUserInput.email);

    if (user) {
      throw new CustomBadRequestException(
        CommonMessage.getMessageEmailExisted(),
      );
    }

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    const newUser = this.userRepository.create(createUserInput);
    const password = await bcrypt.hash(createUserInput.password, 10);

    newUser.password = password;
    const currentUser = await this.userRepository.save(newUser);
    await queryRunner.startTransaction();
    await queryRunner.manager.save(currentUser);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return currentUser;
  }

  async findOneByEmail(emailStaff: string) {
    return this.userRepository.findOne({ email: emailStaff });
  }

  async findOneById(userId: string) {
    return this.userRepository.findOneOrFail({ id: userId });
  }

  async findAll() {
    return this.userRepository.find();
  }
}
