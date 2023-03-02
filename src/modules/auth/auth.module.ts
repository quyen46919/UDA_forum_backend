import { Module } from '@nestjs/common';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from 'src/shared/types/shared.module';
import { JwtConstants } from 'src/shared/services/jwt-constants';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserTokenModule } from '../user-tokens/user-token.module';

@Module({
  imports: [
    UserModule,
    UserTokenModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: async (config: JwtConstants) => ({
        secret: config.secret,
        signOptions: { expiresIn: config.expiresIn },
      }),
      inject: [JwtConstants],
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
