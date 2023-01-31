import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { CreateUserInput } from '../users/dto/create-user-input.dto';
import { AuthService } from './auth.service';
import { LoginResponseType } from './dto/login-response.type';
import { LoginInput } from './dto/login.input';
import { GraphqlGuard } from './graphql.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => LoginResponseType, { description: 'User login' })
  @UseGuards(GraphqlGuard)
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context,
  ): Promise<LoginResponseType> {
    return this.authService.login(context.user);
  }

  @Mutation(() => User, { description: 'User register' })
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.logup(createUserInput);
  }

  @Mutation(() => LoginResponseType, { description: 'Refresh Token' })
  refreshToken(@Args('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { description: 'Log out' })
  logout(@Args('userId') userId: string) {
    return this.authService.logout(userId);
  }
}
