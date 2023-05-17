import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { GroupBoardHistoryTypes } from '../common/enums/board-history.enum';
import { AbstractEntity } from './abstract.entity';
import { GroupBoard } from './group-board.entity';
import { GroupMember } from './group-member.entity';

export interface IGroupBoardHistory {
  type: GroupBoardHistoryTypes;
  columnName: string;
  cardName: string;
  fromColumn: string;
  toColumn: string;
  fromCard: string;
  toCard: string;
  assigneeId: string;
}

@Entity({ name: 'group_board_histories' })
@ObjectType({ description: 'group_board_histories' })
export class GroupBoardHistory
  extends AbstractEntity
  implements IGroupBoardHistory
{
  @Field(() => ID)
  id: string;

  @Column({
    name: 'type',
    type: 'tinyint',
    precision: 11,
    comment:
      '0: CREATE_COLUMN | 1: DROP_COLUMN | 2: ADD_NEW_CARD_TO_COLUMN | 3: DROP_CARD_FROM_COLUMN | 4: MOVE_CARD_FROM_COLUMN_TO_COLUMN | 5: ASSIGN_MEMBER_TO_CARD | 6: UNASSIGN_MEMBER_FROM_CARD | 7: FINISH_ASSIGNED_TASK_FROM_CARD',
  })
  @Field(() => Int, {
    nullable: false,
    description:
      '0: CREATE_COLUMN | 1: DROP_COLUMN | 2: ADD_NEW_CARD_TO_COLUMN | 3: DROP_CARD_FROM_COLUMN | 4: MOVE_CARD_FROM_COLUMN_TO_COLUMN | 5: ASSIGN_MEMBER_TO_CARD | 6: UNASSIGN_MEMBER_FROM_CARD | 7: FINISH_ASSIGNED_TASK_FROM_CARD',
  })
  type: GroupBoardHistoryTypes;

  @Column({
    name: 'column_name',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  columnName: string;

  @Column({
    name: 'card_name',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  cardName: string;

  @Column({
    name: 'from_column',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  fromColumn: string;

  @Column({
    name: 'to_column',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  toColumn: string;

  @Column({
    name: 'from_card',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  fromCard: string;

  @Column({
    name: 'to_card',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  toCard: string;

  @Column({
    name: 'assignee_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  assigneeId: string;

  // relationships
  @Field(() => GroupBoard)
  @JoinColumn({ name: 'board_id' })
  @ManyToOne(() => GroupBoard, (board) => board.histories)
  board: Promise<GroupBoard>;

  @Column({ name: 'board_id', type: 'varchar', length: 36 })
  boardId: string;

  @Field(() => GroupMember)
  @JoinColumn({ name: 'member_id' })
  @ManyToOne(() => GroupMember, (member) => member.histories)
  member: Promise<GroupMember>;

  @Column({ name: 'member_id', type: 'varchar', length: 36 })
  memberId: string;
}
