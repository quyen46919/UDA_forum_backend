import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Question } from './question.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'question_tags' })
@ObjectType({ description: 'question_tags' })
export class QuestionTag extends AbstractEntity {
  @Field(() => Tag)
  @OneToOne(() => Tag, { primary: true })
  @JoinColumn()
  tag: Tag;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.tags, { primary: true })
  question: Question;
}
