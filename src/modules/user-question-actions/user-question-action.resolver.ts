import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserQuestionAction } from 'src/entities/user-question-action.entity';
import { ReactionInput } from './dto/reaction.dto';
import { UserQuestionActionService } from './user-question-action.service';

@Resolver(() => UserQuestionAction)
export class UserQuestionActionResolver {
  constructor(private userQuestionActionService: UserQuestionActionService) {}

  @Mutation(() => UserQuestionAction, {
    description: 'actionType: 0: NOTHING | 1: LIKE | 2: DISLIKE',
  })
  reactQuestion(@Args('reactionInput') reactionInput: ReactionInput) {
    return this.userQuestionActionService.interactWithQuestion(reactionInput);
  }
}
