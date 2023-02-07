import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { ActionTypes } from 'src/common/enums/action.enum';

@InputType()
export class ReactionAnswerInput {
  @MaxLength(36)
  @Field(() => String)
  userId: string;

  @MaxLength(36)
  @Field(() => String)
  answerId: string;

  @Field(() => Int)
  actionType: ActionTypes;
}
