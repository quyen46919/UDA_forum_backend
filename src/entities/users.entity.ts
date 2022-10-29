import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { GenderTypes } from '../common/enums/gender.enum';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export interface UserInterface {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
  bannerUrl?: string;
  gender: GenderTypes;
}

@Entity({ name: 'users' })
@ObjectType({ description: 'users' })
export class User extends AbstractEntity implements UserInterface {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'full_name',
    length: 50,
  })
  @Field(() => String)
  fullName: string;

  @Column({
    name: 'email',
    length: 50,
  })
  @Field(() => String)
  email: string;

  @Column({
    name: 'password',
    length: 255,
  })
  @Field(() => String)
  password: string;

  @Column({
    name: 'avatar_url',
    length: 50,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Column({
    name: 'banner_url',
    length: 50,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  bannerUrl?: string;

  @Column({
    name: 'gender',
    type: 'tinyint',
    comment: '0: Unknow | 1: Male | 2: Female',
  })
  @Field(() => Int, { description: '0: Unknow | 1: Male | 2: Female' })
  gender: GenderTypes = 0;
}
