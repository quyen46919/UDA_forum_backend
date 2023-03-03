import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupColumnOrder } from './group-column-order.entity';
import { Group } from './group.entity';

export interface IGroupBoard {
  title: string;
  color: string;
}

@Entity({ name: 'group_boards' })
@ObjectType({ description: 'group_boards' })
export class GroupBoard extends AbstractEntity implements IGroupBoard {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 100,
  })
  @Field(() => String)
  title: string;

  @Column({
    name: 'color',
    type: 'varchar',
    length: 7,
  })
  @Field(() => String)
  color: string;

  // relationships
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.boards)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>;

  @Column({ name: 'group_id', type: 'varchar', length: 36 })
  createUserId: string;

  @Field(() => GroupColumnOrder)
  @OneToMany(() => GroupColumnOrder, (columnOrder) => columnOrder.columns)
  columnOrder: Promise<GroupColumnOrder[]>;
}
