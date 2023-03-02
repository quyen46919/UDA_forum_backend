import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserQuestionAction } from 'src/entities/user-question-action.entity';
import { ReactionQuestionInput } from './dto/reaction-question-input.dto';

import { UserQuestionActionService } from './user-question-action.service';

@Resolver(() => UserQuestionAction)
export class UserQuestionActionResolver {
  constructor(private userQuestionActionService: UserQuestionActionService) {}

  @Mutation(() => UserQuestionAction, {
    description: 'actionType: 0: NOTHING | 1: LIKE | 2: DISLIKE',
  })
  reactQuestion(@Args('reactionInput') reactionInput: ReactionQuestionInput) {
    return this.userQuestionActionService.interactWithQuestion(reactionInput);
  }
}
