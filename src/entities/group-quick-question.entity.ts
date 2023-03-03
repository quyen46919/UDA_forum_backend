import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { HiddenTypes } from '../common/enums/hidden.enum';
import { QuickQuestionTypes } from '../common/enums/quick-question.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupQuickAnswer } from './group-quick-answer.entity';
import { Group } from './group.entity';

export interface IGroupQuickQuestion {
  title: string;
  startTime: string;
  endTime: string;
  note: string;
  type: QuickQuestionTypes;
  isHidden: HiddenTypes;
}

@Entity({ name: 'group_quick_questions' })
@ObjectType({ description: 'group_quick_questions' })
export class GroupQuickQuestion
  extends AbstractEntity
  implements IGroupQuickQuestion
{
  @Field(() => ID)
  id: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  @Field(() => String)
  title: string;

  @Column({
    name: 'start_time',
    type: 'timestamp',
  })
  @Field(() => String)
  startTime: string;

  @Column({
    name: 'end_time',
    type: 'timestamp',
  })
  @Field(() => String)
  endTime: string;

  @Column({
    name: 'note',
    type: 'varchar',
    length: 255,
  })
  @Field(() => String)
  note: string;

  @Column({
    name: 'type',
    type: 'tinyint',
    default: QuickQuestionTypes.NO_NAME_REQUIRED,
    comment: '0: NO NAME REQUIRED | 1: NAME REQUIRED',
  })
  @Field(() => String, {
    description: '0: NO NAME REQUIRED | 1: NAME REQUIRED -> DEFAULT: 0',
  })
  type: QuickQuestionTypes;

  @Column({
    name: 'is_hidden',
    type: 'tinyint',
    comment: '0: FALSE | 1: TRUE',
    default: HiddenTypes.FALSE,
  })
  @Field(() => Int, { description: '0: FALSE | 1: TRUE -> DEFAULT: 0' })
  isHidden: HiddenTypes;

  //relationships
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.quickQuestions)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>;

  @Column({ name: 'group_id', type: 'varchar', length: 36 })
  groupId: string;

  @Field(() => GroupQuickAnswer)
  @OneToMany(
    () => GroupQuickAnswer,
    (groupQuickQuestion) => groupQuickQuestion.question,
  )
  answers: Promise<GroupQuickAnswer[]>;
}
