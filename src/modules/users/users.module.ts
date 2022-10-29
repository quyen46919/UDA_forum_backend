import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { SharedModule } from 'src/shared/types/shared.module';
import { JwtConstants } from 'src/shared/services/jwt-constants';
import { UserService } from './user.service';
import { UserResolver } from './users.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: async (configService: JwtConstants) => ({
        secret: configService.secret,
        signOptions: { expiresIn: configService.expiresIn },
      }),
      inject: [JwtConstants],
    }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UsersModule {}
