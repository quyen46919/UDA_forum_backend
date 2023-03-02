import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class UpdateTokenInput {
  @Field(() => String)
  id: string;

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
}
