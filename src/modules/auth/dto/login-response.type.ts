import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../entities/user.entity';

@ObjectType()
export class LoginResponseType {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  access_token_expire_time: string;

  @Field(() => String)
  refresh_token: string;

  @Field(() => String)
  refresh_token_expire_time: string;

  @Field(() => User)
  user: User;
}
