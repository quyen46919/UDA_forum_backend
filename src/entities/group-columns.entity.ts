import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupBoard } from './group-board.entity';
import { GroupCard } from './group-card.entity';

export interface IGroupColumn {
  title: string;
  order: number;
}

@Entity({ name: 'group_columns' })
@ObjectType({ description: 'group_columns' })
export class GroupColumn extends AbstractEntity implements IGroupColumn {
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
    name: 'order',
    type: 'smallint',
  })
  @Field(() => Int)
  order: number;

  // relationships
  @Field(() => GroupBoard, { nullable: false })
  @ManyToOne(() => GroupBoard, (board) => board.columns)
  @JoinColumn({ name: 'board_id' })
  board: Promise<GroupBoard>;

  @Column({ name: 'board_id', type: 'varchar', length: 36 })
  boardId: string;

  @Field(() => GroupCard, { nullable: true })
  @OneToMany(() => GroupCard, (card) => card.column, { nullable: true })
  cards: Promise<GroupCard>;
}
