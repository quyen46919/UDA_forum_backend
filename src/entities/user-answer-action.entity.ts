import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ActionTypes } from '../common/enums/action.enum';
import { AbstractEntity } from './abstract.entity';
import { Answer } from './answer.entity';
import { User } from './user.entity';

export interface IUserAnswerAction {
  actionType: ActionTypes;
}

@Entity({ name: 'user_answer_actions' })
@ObjectType({ description: 'user_answer_actions' })
export class UserAnswerAction
  extends AbstractEntity
  implements IUserAnswerAction
{
  @Column({
    name: 'action_type',
    type: 'tinyint',
    comment: '0: NOTHING | 1: LIKE | 2: DISLIKE',
  })
  @Field(() => Int, { description: '0: NOTHING | 1: LIKE | 2: DISLIKE' })
  actionType: ActionTypes = 0;

  @Field(() => Answer)
  @OneToOne(() => Answer, { primary: true })
  @JoinColumn()
  answer: Answer;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.questionActions, { primary: true })
  user: User;
}
