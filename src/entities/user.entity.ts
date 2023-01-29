import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { GenderTypes } from '../common/enums/gender.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { RoleTypes } from '../common/enums/role.enum';
import { UserToken } from './user-token.entity';

export interface UserInterface {
  fullName: string;
  email: string;
  password: string;
  avatar?: string;
  banner?: string;
  phoneNumber?: string;
  description?: string;
  role: RoleTypes;
  gender?: GenderTypes;
  is_valid_email: boolean;
  face_recognition_model?: string;
  secret_key?: string;
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
    name: 'avatar',
    length: 20,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  avatar?: string;

  @Column({
    name: 'banner',
    length: 20,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  banner?: string;

  @Column({
    name: 'phone_number',
    length: 11,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Column({
    type: 'longtext',
    name: 'description',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column({
    name: 'role',
    type: 'tinyint',
  })
  @Field(() => Int, { description: '0: ADMIN | 1: STUDENT | 2: LECTURE' })
  role: RoleTypes = 1;

  @Column({
    name: 'gender',
    type: 'tinyint',
    comment: '0: Unknow | 1: Male | 2: Female',
  })
  @Field(() => Int, { description: '0: Unknow | 1: Male | 2: Female' })
  gender: GenderTypes = 0;

  @Column({
    type: 'tinyint',
    name: 'is_valid_email',
  })
  @Field(() => Int)
  is_valid_email = false;

  @Column({
    name: 'face_recognition_model',
    length: 200,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  faceRecognitionModel?: string;

  @Column({
    name: 'secret_key',
    length: 50,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  secret_key?: string;

  // relationship
  @Field(() => [UserToken])
  @OneToMany(() => UserToken, (tokens) => tokens.user, { cascade: true })
  userTokens: UserToken[];
}
