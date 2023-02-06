import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Question } from './question.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'question_tags' })
@ObjectType({ description: 'question_tags' })
export class QuestionTag extends AbstractEntity {
  @Field(() => ID)
  id: string;

  @Field(() => Tag)
  @ManyToOne(() => Tag, (tag) => tag.questionTag)
  @JoinColumn({ name: 'tag_id' })
  tag: Promise<Tag>;

  @Column({ name: 'tag_id', type: 'varchar', length: 36 })
  tagId: string;

  // @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.tags)
  @JoinColumn({ name: 'question_id' })
  question: Promise<Question>;

  @Column({ name: 'question_id', type: 'varchar', length: 36 })
  questionId: string;
}
