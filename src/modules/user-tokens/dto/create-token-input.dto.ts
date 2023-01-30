import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { TokenTypes } from 'src/common/enums/token.enum';

@InputType()
export class CreateTokenInput {
  @Field(() => String)
  userId: string;

  @MaxLength(255)
  @Field(() => String)
  token: string;

  @MaxLength(255)
  @Field(() => String)
  refreshToken: string;

  @Field(() => String)
  expireAt: string;

  @Field(() => String)
  refreshExpireAt: string;

  @Field(() => Int)
  version: number;

  @MaxLength(255)
  @Field(() => String)
  description?: string;

  @Field(() => Int)
  type: TokenTypes = 0;
}
