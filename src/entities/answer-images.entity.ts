import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Answer } from './answer.entity';

export interface IAnswerImage {
  name: string;
}

@Entity({ name: 'answer_images' })
@ObjectType({ description: 'answer_images' })
export class AnswerImage extends AbstractEntity implements IAnswerImage {
  @Field(() => ID)
  id: string;

  @Column({
    name: 'name',
    length: 20,
  })
  @Field(() => String)
  name: string;

  @Column({ name: 'answer_id', type: 'varchar', length: 36 })
  @Field(() => [Answer])
  @ManyToOne(() => Answer, (answer) => answer.images)
  answer: Answer;
}
