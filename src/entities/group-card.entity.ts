import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { FavoriteTypes } from '../common/enums/favorite.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupColumn } from './group-columns.entity';

export interface IGroupCard {
  title: string;
  content: string;
  tag: string;
  thumbnail: string;
  order: number;
  isFavorite: number;
}

@Entity({ name: 'group_cards' })
@ObjectType({ description: 'group_cards' })
export class GroupCard extends AbstractEntity implements IGroupCard {
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
    name: 'content',
    type: 'varchar',
    length: 255,
  })
  @Field(() => String)
  content: string;

  @Column({
    name: 'tag',
    type: 'varchar',
    length: 100,
  })
  @Field(() => String)
  tag: string;

  @Column({
    name: 'thumbnail',
    type: 'varchar',
    length: 20,
  })
  @Field(() => String)
  thumbnail: string;

  @Column({
    name: 'order',
    type: 'smallint',
  })
  @Field(() => Int)
  order: number;

  @Column({
    name: 'is_favorite',
    type: 'tinyint',
    default: FavoriteTypes.NONE,
    comment: '0: NONE | 1: FAVORITED',
  })
  @Field(() => String, { description: '0: NONE | 1: FAVORITED' })
  isFavorite: FavoriteTypes;

  // relationships
  @Field(() => GroupColumn)
  @ManyToOne(() => GroupColumn, (column) => column.cards)
  @JoinColumn({ name: 'column_id' })
  column: Promise<GroupColumn>;

  @Column({ name: 'column_id', type: 'varchar', length: 36 })
  columnId: string;
}
