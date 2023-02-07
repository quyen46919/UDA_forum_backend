import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { ActionTypes } from 'src/common/enums/action.enum';

@InputType()
export class ReactionQuestionInput {
  @MaxLength(36)
  @Field(() => String)
  userId: string;

  @MaxLength(36)
  @Field(() => String)
  questionId: string;

  @Field(() => Int)
  actionType: ActionTypes;
}
