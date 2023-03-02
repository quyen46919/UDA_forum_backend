import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAnswerAction } from 'src/entities/user-answer-action.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ReactionAnswerInput } from './dto/reaction-answer-input.dto';

@Injectable()
export class UserAnswerActionService {
  constructor(
    @InjectRepository(UserAnswerAction)
    private userAnswerActionRepository: Repository<UserAnswerAction>,
  ) {}

  async interactWithAnswer(reaction: ReactionAnswerInput) {
    const savedReaction = await this.userAnswerActionRepository.findOne({
      answerId: reaction.answerId,
      userId: reaction.userId,
    });

    if (!savedReaction) {
      return await this.userAnswerActionRepository.save(reaction);
    }

    return await this.userAnswerActionRepository.save({
      ...savedReaction,
      actionType: reaction.actionType,
    });
  }
}
