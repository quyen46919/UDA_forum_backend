import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAnswerAction } from 'src/entities/user-answer-action.entity';
import { UserAnswerActionResolver } from './user-answer-action.resolver';
import { UserAnswerActionService } from './user-answer-action.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAnswerAction])],
  providers: [UserAnswerActionService, UserAnswerActionResolver],
  exports: [UserAnswerActionService],
})
export class UserAnswerActionModule {}
