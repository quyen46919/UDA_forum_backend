import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserAnswerAction } from 'src/entities/user-answer-action.entity';
import { ReactionAnswerInput } from './dto/reaction-answer-input.dto';
import { UserAnswerActionService } from './user-answer-action.service';

@Resolver(() => UserAnswerAction)
export class UserAnswerActionResolver {
  constructor(private userAnswerActionRepository: UserAnswerActionService) {}

  @Mutation(() => UserAnswerAction, {
    description: 'actionType: 0: NOTHING | 1: LIKE | 2: DISLIKE',
  })
  reactAnswer(@Args('reactionInput') reactionInput: ReactionAnswerInput) {
    return this.userAnswerActionRepository.interactWithAnswer(reactionInput);
  }
}
