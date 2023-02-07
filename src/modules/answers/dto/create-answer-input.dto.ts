import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  documentLink?: string;

  @Field(() => String)
  createUserId: string;

  @Field(() => String)
  questionId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  answerId?: string;
}
