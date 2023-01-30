import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { RoleTypes } from '../common/enums/role.enum';
import { TokenTypes } from '../common/enums/token.enum';
import { AbstractEntity } from './abstract.entity';
import { User } from './user.entity';

export interface IUserToken {
  token: string;
  refreshToken: string;
  expireAt: Date;
  refreshExpireAt: Date;
  version: number;
  description?: string;
  type: TokenTypes;
}

@Entity({ name: 'user_tokens' })
@ObjectType({ description: 'user_tokens' })
export class UserToken extends AbstractEntity implements IUserToken {
  type: TokenTypes;
  @Field(() => ID)
  id: string;

  @Field(() => User)
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.userTokens)
  user: User;

  @Column({ name: 'user_id', type: 'varchar', length: 36 })
  userId: string;

  @Column({
    name: 'token',
    length: 512,
  })
  @Field(() => String)
  token: string;

  @Column({
    name: 'refresh_token',
    length: 512,
  })
  @Field(() => String)
  refreshToken: string;

  @Column({
    name: 'expire_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => String)
  expireAt: Date;

  @Column({
    name: 'refresh_expire_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => String)
  refreshExpireAt: Date;

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
    comment: '0: ADMIN | 1: STUDENT | 2: LECTURE',
  })
  @Field(() => Int, { description: '0: ADMIN | 1: STUDENT | 2: LECTURE' })
  role: RoleTypes = 1;
}
