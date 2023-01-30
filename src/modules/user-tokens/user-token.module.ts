import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from '../../entities/user-token.entity';
import { UserTokenResolver } from './user-token.resolver';
import { UserTokenService } from './user-token.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserToken])],
  providers: [UserTokenService, UserTokenResolver],
  exports: [UserTokenService],
})
export class UserTokenModule {}
