import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupCard } from './group-card.entity';
import { GroupColumn } from './group-columns.entity';

export interface IGroupCardOrder {
  order: number;
}

@Entity({ name: 'group_card_orders' })
@ObjectType({ description: 'group_card_orders' })
export class GroupCardOrder extends AbstractEntity implements IGroupCardOrder {
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
  @ManyToOne(() => GroupColumn, (column) => column.cardOrders)
  @JoinColumn({ name: 'column_id' })
  columns: Promise<GroupColumn>;

  @Column({ name: 'column_id', type: 'varchar', length: 36 })
  columnId: string;

  @Field(() => GroupCard)
  @ManyToOne(() => GroupCard, (card) => card.order)
  @JoinColumn({ name: 'card_id' })
  card: Promise<GroupCard>;

  @Column({ name: 'card_id', type: 'varchar', length: 36 })
  cardId: string;
}
