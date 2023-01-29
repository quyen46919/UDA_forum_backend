import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, DeleteDateColumn, Entity, OneToMany } from 'typeorm';
import { ExactnessTypes } from '../common/enums/exactness.enum';
import { HiddenTypes } from '../common/enums/hidden.enum';
import { AbstractEntity } from './abstract.entity';
import { AnswerImage } from './answer-images.entity';

export interface IAnswer {
  createUserId?: string;
  content: string;
  count: number;
  documentLink: string;
  isCorrectAnswer: ExactnessTypes;
  isHidden: HiddenTypes;
  deletedAt: Date;
}

@Entity({ name: 'answers' })
@ObjectType({ description: 'answers' })
export class Answer extends AbstractEntity implements IAnswer {
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
    name: 'document_link',
    length: 255,
  })
  @Field(() => String)
  documentLink: string;

  @Column({
    name: 'is_correct_answer',
    type: 'tinyint',
    comment: '0: NOTHING | 1: WRONG | 2: CORRECT',
  })
  @Field(() => Int, { description: '0: NOTHING | 1: WRONG | 2: CORRECT' })
  isCorrectAnswer: ExactnessTypes = 0;

  @Column({
    name: 'is_hidden',
    type: 'tinyint',
    comment: '0: FALSE | 1: TRUE',
  })
  @Field(() => Int, { description: '0: FALSE | 1: TRUE' })
  isHidden: HiddenTypes = 0;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'deleted_at',
  })
  deletedAt: Date;

  @Field(() => [AnswerImage])
  @OneToMany(() => AnswerImage, (questionImage) => questionImage.answer, {
    cascade: true,
  })
  images: AnswerImage[];
}
