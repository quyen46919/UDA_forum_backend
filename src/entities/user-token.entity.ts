import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { RoleTypes } from '../common/enums/role.enum';
import { TokenTypes } from '../common/enums/token.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';

export interface UserToken {
  token: string;
  refreshToken: string;
  version: number;
  description?: string;
  type: TokenTypes;
}

@Entity({ name: 'user_tokens' })
@ObjectType({ description: 'user_tokens' })
export class UserToken extends AbstractEntity implements UserToken {
  @Field(() => ID)
  id: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.userTokens)
  user: User;

  @Column({
    name: 'token',
    length: 255,
  })
  @Field(() => String)
  token: string;

  @Column({
    name: 'refresh_token',
    length: 255,
  })
  @Field(() => String)
  refreshToken: string;

  @Column({
    name: 'version',
  })
  @Field(() => Int)
  version: number;

  @Column({
    name: 'description',
    length: 255,
  })
  @Field(() => String)
  description?: string;

  @Column({
    name: 'type',
    type: 'tinyint',
  })
  @Field(() => Int, { description: '0: ADMIN | 1: STUDENT | 2: LECTURE' })
  role: RoleTypes = 1;
}
