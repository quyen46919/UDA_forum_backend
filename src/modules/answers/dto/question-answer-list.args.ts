import { ArgsType, Field, ID } from '@nestjs/graphql';
import ConnectionArgs from 'src/shared/agrs/connection.args';

@ArgsType()
export class QuestionAnswerListArg extends ConnectionArgs {
  @Field(() => ID)
  questionId: string;
}
