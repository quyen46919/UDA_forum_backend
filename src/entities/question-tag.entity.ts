import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Question } from './question.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'question_tags' })
@ObjectType({ description: 'question_tags' })
export class QuestionTag extends AbstractEntity {
  @Column({ name: 'tag_id', type: 'varchar', length: 36 })
  @Field(() => Tag)
  @OneToOne(() => Tag, { primary: true })
  @JoinColumn()
  tag: Tag;

  @Column({ name: 'question_id', type: 'varchar', length: 36 })
  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.tags, { primary: true })
  question: Question;
}
