import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { GenderTypes } from '../common/enums/gender.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { RoleTypes } from '../common/enums/role.enum';
import { UserToken } from './user-token.entity';
import { UserQuestionAction } from './user-question-action.entity';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { UserAnswerAction } from './user-answer-action.entity';
import { Image } from './image.entity';

export interface IUser {
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
export class User extends AbstractEntity implements IUser {
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
    comment: '0: ADMIN | 1: STUDENT | 2: LECTURE',
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

  // relationships
  @Field(() => [UserToken])
  @OneToMany(() => UserToken, (tokens) => tokens.user, { cascade: true })
  userTokens: Promise<UserToken[]>;

  @Field(() => [UserQuestionAction])
  @OneToMany(() => UserQuestionAction, (actions) => actions.user, {
    cascade: true,
  })
  questionActions: Promise<UserQuestionAction[]>;

  @Field(() => [UserAnswerAction])
  @OneToMany(() => UserAnswerAction, (actions) => actions.user, {
    cascade: true,
  })
  answerActions: Promise<UserAnswerAction[]>;

  @Field(() => [Question])
  @OneToMany(() => Question, (question) => question.user, { cascade: true })
  questions: Promise<Question[]>;

  @Field(() => [Answer])
  @OneToMany(() => Answer, (question) => question.user, { cascade: true })
  answers: Promise<Answer[]>;

  @Field(() => [Image])
  @OneToMany(() => Image, (image) => image.user)
  images: Promise<Image[]>;
}
