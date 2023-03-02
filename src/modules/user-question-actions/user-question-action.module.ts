import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuestionAction } from 'src/entities/user-question-action.entity';
import { UserQuestionActionResolver } from './user-question-action.resolver';
import { UserQuestionActionService } from './user-question-action.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuestionAction])],
  providers: [UserQuestionActionResolver, UserQuestionActionService],
  exports: [UserQuestionActionService],
})
export class UserQuestionActionModule {}
