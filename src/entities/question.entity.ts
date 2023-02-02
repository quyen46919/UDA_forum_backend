import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { HiddenTypes } from '../common/enums/hidden.enum';
import { AbstractEntity } from './abstract.entity';
import { QuestionImage } from './question-images.entity';
import { QuestionTag } from './question-tag.entity';

export interface IQuestion {
  createUserId?: string;
  title: string;
  content: string;
  count: number;
  githubLink: string;
  isHidden: HiddenTypes;
  deletedAt: Date;
}

@Entity({ name: 'questions' })
@ObjectType({ description: 'questions' })
export class Question extends AbstractEntity implements IQuestion {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'create_user_id',
    length: 255,
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  createUserId?: string;

  @Column({
    name: 'title',
    length: 255,
  })
  @Field(() => String)
  title: string;

  @Column({
    type: 'longtext',
    name: 'content',
  })
  @Field(() => String)
  content: string;

  @Column({
    name: 'count',
  })
  @Field(() => Int)
  count: number;

  @Column({
    name: 'github_link',
    length: 255,
  })
  @Field(() => String)
  githubLink: string;

  @Column({
    name: 'is_hidden',
    type: 'tinyint',
    comment: '0: FALSE | 1: TRUE',
    default: 0,
  })
  @Field(() => Int, { description: '0: FALSE | 1: TRUE' })
  isHidden: HiddenTypes = 0;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt: Date;

  // relationships
  @Field(() => [QuestionTag])
  @OneToMany(() => QuestionTag, (questionTag) => questionTag.question, {
    cascade: true,
  })
  tags: QuestionTag[];

  @Field(() => [QuestionImage])
  @OneToMany(() => QuestionImage, (questionImage) => questionImage.question, {
    cascade: true,
  })
  images: QuestionImage[];
}
