import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupQuickQuestion } from './group-quick-question.entity';

export interface IGroupQuickAnswer {
  responseNickname: string;
  answer: string;
}

@Entity({ name: 'group_quick_answers' })
@ObjectType({ description: 'group_quick_answers' })
export class GroupQuickAnswer
  extends AbstractEntity
  implements IGroupQuickAnswer
{
  @Field(() => ID)
  id: string;

  @Column({
    name: 'response_nickname',
    type: 'varchar',
    length: 50,
  })
  @Field(() => String)
  responseNickname: string;

  @Column({
    name: 'answer',
    type: 'varchar',
    length: 255,
  })
  @Field(() => String)
  answer: string;

  //relationships
  @Field(() => GroupQuickQuestion)
  @ManyToOne(
    () => GroupQuickQuestion,
    (groupQuickQuestion) => groupQuickQuestion.answers,
  )
  @JoinColumn({ name: 'question_id' })
  question: Promise<GroupQuickQuestion>;

  @Column({ name: 'question_id', type: 'varchar', length: 36 })
  questionId: string;
}
