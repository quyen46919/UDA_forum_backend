import { JwtService } from '@nestjs/jwt';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/users.entity';
import { CreateUserInput } from '../users/dto/create-user-input.dto';
import { AuthService } from './auth.service';
import { LoginResponseType } from './dto/login-response.type';
import { LoginInput } from './dto/login.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlGuard } from './graphql.guard';
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
    return this.authService.signup(createUserInput);
  }
}
