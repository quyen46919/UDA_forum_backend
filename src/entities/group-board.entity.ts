import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupBoardHistory } from './group-board-history.entity';
import { GroupColumn } from './group-columns.entity';
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
    length: 50,
  })
  @Field(() => String)
  color: string;

  // relationships
  @Field(() => Group)
  @ManyToOne(() => Group, (group) => group.boards)
  @JoinColumn({ name: 'group_id' })
  group: Promise<Group>;

  @Column({ name: 'group_id', type: 'varchar', length: 36 })
  groupId: string;

  @Field(() => GroupColumn, { nullable: true })
  @OneToMany(() => GroupColumn, (column) => column.board, {
    eager: true,
    lazy: true,
    nullable: true,
  })
  columns: Promise<GroupColumn>;

  @Field(() => GroupBoardHistory)
  @OneToMany(() => GroupBoardHistory, (column) => column.board)
  histories: Promise<GroupBoardHistory>;
}
