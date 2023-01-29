import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ActionTypes } from '../common/enums/action.enum';
import { AbstractEntity } from './abstract.entity';
import { Question } from './question.entity';
import { User } from './user.entity';

export interface IUserQuestionAction {
  actionType: ActionTypes;
}

@Entity({ name: 'user_question_actions' })
@ObjectType({ description: 'user_question_actions' })
export class UserQuestionAction
  extends AbstractEntity
  implements IUserQuestionAction
{
  @Column({
    name: 'action_type',
    type: 'tinyint',
    comment: '0: NOTHING | 1: LIKE | 2: DISLIKE',
  })
  @Field(() => Int, { description: '0: NOTHING | 1: LIKE | 2: DISLIKE' })
  actionType: ActionTypes = 0;

  @Field(() => Question)
  @OneToOne(() => Question, { primary: true })
  @JoinColumn()
  question: Question;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.questionActions, { primary: true })
  user: User;
}
