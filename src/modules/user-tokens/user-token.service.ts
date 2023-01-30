import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from '../../entities/user-token.entity';
import { getConnection, MoreThan, Repository } from 'typeorm';
import { CreateTokenInput } from './dto/create-token-input.dto';

export class UserTokenService {
  constructor(
    @InjectRepository(UserToken)
    private userTokenRepository: Repository<UserToken>,
  ) {}

  async create(createTokenInput: CreateTokenInput) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    const newToken = this.userTokenRepository.create(createTokenInput);

    const currentToken = await this.userTokenRepository.save(newToken);
    await queryRunner.startTransaction();
    await queryRunner.manager.save(currentToken);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return currentToken;
  }

  async findOneValidToken(userId: string) {
    return this.userTokenRepository.findOne({
      where: {
        userId: userId,
        expireAt: MoreThan(new Date().toISOString().slice(0, 10)),
      },
      order: { version: 'DESC' },
    });
  }

  async findOneValidRefreshToken(userId: string, refreshToken: string) {
    return this.userTokenRepository.findOne({
      where: {
        userId: userId,
        expireAt: MoreThan(new Date().toISOString().slice(0, 10)),
        refreshToken: refreshToken,
      },
      order: { version: 'DESC' },
    });
  }
}
