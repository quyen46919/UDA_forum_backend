import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateQuestionTagInput {
  @Field(() => String)
  questionId: string;

  @Field(() => String)
  tagId: string;
}
