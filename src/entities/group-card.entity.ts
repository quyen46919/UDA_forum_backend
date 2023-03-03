import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { GroupCardOrder } from './group-card-order.entity';

export interface IGroupCard {
  title: string;
  content: string;
  tag: string;
  thumbnail: string;
}

@Entity({ name: 'cards' })
@ObjectType({ description: 'cards' })
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

  // relationships
  @Field(() => GroupCardOrder)
  @OneToMany(() => GroupCardOrder, (cardOrder) => cardOrder.card)
  order: Promise<GroupCardOrder>;
}
