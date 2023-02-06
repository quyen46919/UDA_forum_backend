import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserQuestionAction } from 'src/entities/user-question-action.entity';
import { Repository } from 'typeorm/repository/Repository';
import { ReactionInput } from './dto/reaction.dto';

@Injectable()
export class UserQuestionActionService {
  constructor(
    @InjectRepository(UserQuestionAction)
    private userQuestionActionRepository: Repository<UserQuestionAction>,
  ) {}

  async interactWithQuestion(reaction: ReactionInput) {
    const savedReaction = await this.userQuestionActionRepository.findOne({
      questionId: reaction.questionId,
      userId: reaction.userId,
    });

    if (!savedReaction) {
      return await this.userQuestionActionRepository.save(reaction);
    }

    return await this.userQuestionActionRepository.save({
      ...savedReaction,
      actionType: reaction.actionType,
    });
  }
}
