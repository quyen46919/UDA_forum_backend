import { Module } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionTag } from 'src/entities/question-tag.entity';
import { QuestionTagResolver } from './question-tag.resolver';
import { QuestionTagService } from './question-tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionTag])],
  providers: [QuestionTagService, QuestionTagResolver],
  exports: [QuestionTagService],
})
export class QuestionTagModule {}
