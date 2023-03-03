import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupBoard } from './group-board.entity';
import { GroupColumn } from './group-columns.entity';

export interface IGroupColumnOrder {
  order: number;
}

@Entity({ name: 'group_column_orders' })
@ObjectType({ description: 'group_column_orders' })
export class GroupColumnOrder
  extends AbstractEntity
  implements IGroupColumnOrder
{
  @Field(() => ID)
  id: string;

  @Column({
    name: 'order',
    type: 'tinyint',
  })
  @Field(() => Int)
  order: number;

  // relationships
  @Field(() => GroupColumn)
  @ManyToOne(() => GroupColumn, (column) => column.columnOrders)
  @JoinColumn({ name: 'column_id' })
  columns: Promise<GroupColumn>;

  @Column({ name: 'column_id', type: 'varchar', length: 36 })
  columnId: string;

  @Field(() => GroupBoard)
  @ManyToOne(() => GroupBoard, (board) => board.columnOrder)
  @JoinColumn({ name: 'board_id' })
  boards: Promise<GroupBoard>;

  @Column({ name: 'board_id', type: 'varchar', length: 36 })
  boardId: string;
}
