import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ExactnessTypes } from '../common/enums/exactness.enum';
import { HiddenTypes } from '../common/enums/hidden.enum';
import { AbstractEntity } from './abstract.entity';
import { AnswerImage } from './answer-images.entity';
import { UserAnswerAction } from './user-answer-action.entity';
import { User } from './user.entity';

export interface IAnswer {
  createUserId?: string;
  content: string;
  count: number;
  documentLink: string;
  isCorrectAnswer: ExactnessTypes;
  isHidden: HiddenTypes;
  deletedAt: Date;
}

@Entity({ name: 'answers' })
@ObjectType({ description: 'answers' })
export class Answer extends AbstractEntity implements IAnswer {
  @Field(() => ID)
  id: string;

  @Column({
    type: 'longtext',
    name: 'content',
  })
  @Field(() => String)
  content: string;

  @Column({
    name: 'count',
  })
  @Field(() => Int)
  count: number;

  @Column({
    name: 'document_link',
    length: 255,
  })
  @Field(() => String)
  documentLink: string;

  @Column({
    name: 'is_correct_answer',
    type: 'tinyint',
    comment: '0: NOTHING | 1: WRONG | 2: CORRECT',
  })
  @Field(() => Int, { description: '0: NOTHING | 1: WRONG | 2: CORRECT' })
  isCorrectAnswer: ExactnessTypes = 0;

  @Column({
    name: 'is_hidden',
    type: 'tinyint',
    comment: '0: FALSE | 1: TRUE',
    default: 0,
  })
  @Field(() => Int, { description: '0: FALSE | 1: TRUE' })
  isHidden: HiddenTypes = 0;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt: Date;

  @Field(() => [AnswerImage])
  @OneToMany(() => AnswerImage, (questionImage) => questionImage.answer, {
    cascade: true,
  })
  images: AnswerImage[];

  @Field(() => User)
  @JoinColumn({ name: 'create_user_id' })
  @ManyToOne(() => User, (user) => user.answers)
  user: User;

  @Column({
    name: 'create_user_id',
    type: 'varchar',
    length: 36,
  })
  createUserId?: string;

  @Field(() => [UserAnswerAction])
  @OneToMany(() => UserAnswerAction, (actions) => actions.answer)
  actions: UserAnswerAction[];
}
