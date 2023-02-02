import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { HiddenTypes } from '../common/enums/hidden.enum';
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export interface ITag {
  name: string;
  logo: string;
  description: string;
  isHidden: number;
}

@Entity({ name: 'tags' })
@ObjectType({ description: 'tags' })
export class Tag extends AbstractEntity implements ITag {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'name',
    length: 128,
  })
  @Field(() => String)
  name: string;

  @Column({
    name: 'logo',
    length: 20,
  })
  @Field(() => String)
  logo: string;

  @Column({
    name: 'description',
    length: 512,
  })
  @Field(() => String)
  description: string;

  @Column({
    name: 'is_hidden',
    type: 'tinyint',
    comment: '0: FALSE | 1: TRUE',
    default: 0,
  })
  @Field(() => Int, { description: '0: FALSE | 1: TRUE' })
  isHidden: HiddenTypes = 0;
}
