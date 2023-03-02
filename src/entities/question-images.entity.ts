import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Question } from './question.entity';

export interface IQuestionImage {
  name: string;
}

@Entity({ name: 'question_images' })
@ObjectType({ description: 'question_images' })
export class QuestionImage extends AbstractEntity implements IQuestionImage {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'name',
    length: 20,
  })
  @Field(() => String)
  name: string;

  @Field(() => [Question])
  @ManyToOne(() => Question, (question) => question.images)
  @JoinColumn({ name: 'question_id' })
  question: Promise<Question>;

  @Column({ name: 'question_id', type: 'varchar', length: 36 })
  questionId: string;
}
