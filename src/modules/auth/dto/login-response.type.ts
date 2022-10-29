import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../../entities/users.entity';

@ObjectType()
export class LoginResponseType {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
