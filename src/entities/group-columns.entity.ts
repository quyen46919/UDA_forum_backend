import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { HiddenTypes } from '../common/enums/hidden.enum';
import { GroupColumnOrder } from './group-column-order.entity';
import { GroupCardOrder } from './group-card-order.entity';

export interface IGroupColumn {
  title: string;
  isFavorite: number;
}

@Entity({ name: 'group_columns' })
@ObjectType({ description: 'group_columns' })
export class GroupColumn extends AbstractEntity implements IGroupColumn {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'is_favorite',
    type: 'tinyint',
    default: HiddenTypes.FALSE,
    comment: '0: NORMAL | 1: FAVORITE',
  })
  @Field(() => String, { description: '0: NORMAL | 1: FAVORITE' })
  isFavorite: HiddenTypes;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 100,
  })
  @Field(() => String)
  title: string;

  // relationships
  @Field(() => GroupColumnOrder)
  @OneToMany(() => GroupColumnOrder, (columnOrder) => columnOrder.boards)
  columnOrders: Promise<GroupColumnOrder>;

  @Field(() => GroupCardOrder)
  @OneToMany(() => GroupCardOrder, (card) => card.columns)
  cardOrders: Promise<GroupCardOrder[]>;
}
