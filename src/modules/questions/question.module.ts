import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { QuestionTagModule } from '../question-tags/question-tag.module';
import { TagModule } from '../tags/tag.module';
import { UserModule } from '../users/users.module';
import { QuestionResolver } from './question.resolver';
import { QuestionService } from './question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    UserModule,
    TagModule,
    QuestionTagModule,
  ],
  providers: [QuestionResolver, QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
